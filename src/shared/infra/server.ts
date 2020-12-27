import 'reflect-metadata';
import 'dotenv/config';
import express, {
  Request, Response, NextFunction,
} from 'express';
import { errors } from 'celebrate'
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import '@shared/container';


import routes from './http/routes';
import { createConnections } from 'typeorm';

const app = express();




app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(6666, async () => {
  await createConnections();

  console.log('SERVER STARTED ON PORT 6666');

})

