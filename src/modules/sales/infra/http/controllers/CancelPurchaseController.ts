import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer'


import CancelPurchaseService from '@modules/sales/services/CancelPurchaseService';


export default class CancelPurchaseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const transaction_id = request.params.id
    const type = request.user.type




    const canceltransaction = container.resolve(CancelPurchaseService);

    const newproduct = await canceltransaction.run({
      transaction_id,
      type,

    }


    );






    return response.json(classToClass(newproduct));

  }
}
