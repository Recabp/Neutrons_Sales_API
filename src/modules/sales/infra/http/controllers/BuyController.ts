import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer'

import BuyService from '@modules/sales/services/BuyService';


export default class BuyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { product, quantity } = request.body;
    const provider_id = request.params.id;
    const client_id = request.user.id;
    const type = request.user.type;


    console.log(type)









    const buyproduct = container.resolve(BuyService);

    const newproduct = await buyproduct.run({
      product,
      quantity,
      provider_id,
      client_id,
      type

    });






    return response.json(classToClass(newproduct),);

  }
}
