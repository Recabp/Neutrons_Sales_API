import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AddStockService from '@modules/sales/services/AddStockService';

export default class AddStockController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { product, quantity, price } = request.body;
    const provider_id = request.user.id;
    const { type } = request.user;

    const addproduct = container.resolve(AddStockService);

    const newproduct = await addproduct.run({
      product,
      quantity,
      provider_id,
      price,
      type,
    });

    return response.json(classToClass(newproduct));
  }
}
