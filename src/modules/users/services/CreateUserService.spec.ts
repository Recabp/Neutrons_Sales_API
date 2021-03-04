import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeCacheRepository from '@shared/container/providers/CacheProvider/fakes/FakecacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakecacheRepository: FakeCacheRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakecacheRepository = new FakeCacheRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakecacheRepository,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.run({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      type: 'provider',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    await createUser.run({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      type: 'client',
      password: '123456',
    });

    await expect(
      createUser.run({
        name: 'Fulano de Tal',
        email: 'fulanodetal@exemple.com',
        type: 'client',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
