import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';
import authConfig from '@config/authconfig';
import AppError from '@shared/errors/AppError';
import { formatDiagnosticsWithColorAndContext } from 'typescript';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  type: 'client' | 'provider';

}



export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const decodedPayload = decode(token)


    const { type } = decodedPayload as TokenPayload


    const { sub } = decoded as TokenPayload;


    request.user = {
      id: sub,
      type: type,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
