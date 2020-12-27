import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersService from '@modules/users/services/ListProvidersService';
import User from '../../typeorm/entities/User';

export default class ListProvidersControllers {
  public async index(request: Request, response: Response): Promise<User[]> {
    const user_id = request.user.id




    const listProvider = container.resolve(ListProvidersService);

    const providerList = await listProvider.run({
      user_id,


    });



    return response.json(classToClass(providerList));

  }
}
