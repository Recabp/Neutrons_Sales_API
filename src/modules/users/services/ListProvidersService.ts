
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserWhithoutPasswordDTO from '../dtos/IUserWhithoutPasswordDTO';





interface IRequest {
  user_id: string;

}








@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,


  ) { }

  public async run({ user_id }: IRequest): Promise<User[] | IUserWhithoutPasswordDTO[]> {

    let list = await this.cacheProvider.recover<User[]>(`provider-list: ${user_id}`);


    if (!list) {

      list = await this.usersRepository.listProvider(user_id);

    }


    return list;


  }


}

export default ListProviderService;
