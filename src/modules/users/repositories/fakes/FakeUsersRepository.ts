import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import IUserWhithoutPasswordDTO from '@modules/users/dtos/IUserWhithoutPasswordDTO';
import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async listProvider(): Promise<User[]> {
    const listProvider = this.users.filter(user => user.type === 'provider');

    return listProvider;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users[0];
    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async excludePassword(user: User): Promise<IUserWhithoutPasswordDTO> {
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
    };

    return userWithoutPassword;
  }
}

export default FakeUsersRepository;
