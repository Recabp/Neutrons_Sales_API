import { inject, injectable } from 'tsyringe';

import IUserWhithoutPasswordDTO from '@modules/users/dtos/IUserWhithoutPasswordDTO';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';






interface IRequest {
  name: string,
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



  ) { }

  public async run({ name, email, type, password }: IRequest): Promise<IUserWhithoutPasswordDTO> {


    const checkUserExists = await this.usersRepository.findByEmail(email)
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



      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };






      await this.cacheProvider.save(`provider-list: ${user.id}`, userWithoutPassword);

      return user;

    }


    return user;
  }





}

export default CreateUserService;
