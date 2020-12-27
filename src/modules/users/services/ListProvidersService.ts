
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';




interface IRequest {
  user_id: string;

}




@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,


  ) { }

  public async run({ user_id }: IRequest): Promise<User[]> {


    const provider = await this.usersRepository.listProvider(user_id);




    return provider;


  }


}

export default ListProviderService;
