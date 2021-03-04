import { inject, injectable } from 'tsyringe';

import IUserWhithoutPasswordDTO from '@modules/users/dtos/IUserWhithoutPasswordDTO';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  type: 'client' | 'provider';
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async run({
    name,
    email,
    type,
    password,
  }: IRequest): Promise<IUserWhithoutPasswordDTO> {
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('This email is already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      type,
      password: hashedPassword,
    });

    if (user.type === 'provider') {
      await this.cacheProvider.invalidatePrefix(`providers-list`);

      return user;
    }

    return user;
  }
}

export default CreateUserService;
