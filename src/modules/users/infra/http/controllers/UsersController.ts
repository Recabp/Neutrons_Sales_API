import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, type } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.run({
      name,
      email,
      type,
      password,
    });

    return response.json(classToClass(user));
  }
}
