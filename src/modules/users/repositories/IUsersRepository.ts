import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUserWhithoutPasswordDTO from '../dtos/IUserWhithoutPasswordDTO';




export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  listProvider(id: string): Promise<IUserWhithoutPasswordDTO[]>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;


};
