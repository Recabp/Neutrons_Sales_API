import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class UpdateProfileControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id



    const updateUser = container.resolve(UpdateProfileService);

    const user = await updateUser.run({
      name,
      email,
      password,
      old_password,
      user_id,

    });



    return response.json(classToClass(user));

  }
}
