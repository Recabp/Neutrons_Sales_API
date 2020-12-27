import AppError from '@shared/errors/AppError';
import 'reflect-metadata';


import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';




let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;


describe('CreateUser', () => {
  beforeEach(() => {

    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);



  });


  it('should be able to list only providers', async () => {

    const provider1 = await fakeUsersRepository.create({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      type: 'provider',
      password: '123456',

    });

    const provider2 = await fakeUsersRepository.create({
      name: 'Fulano de Tals',
      email: 'fulanodetals@exemple.com',
      type: 'provider',
      password: '123456',

    });

    await fakeUsersRepository.create({
      name: 'Fulano de Tal3',
      email: 'fulanodetal3@exemple.com',
      type: 'client',
      password: '123456',

    });



    const user_id = 'asdasdasdasdasdasdasd'



    const providers = await listProvidersService.run({ user_id })



    expect(providers).toEqual([provider1, provider2]);



  });












})
