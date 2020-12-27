import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer'



import ListCustomerOrders from '@modules/sales/services/ListCustomerOrders';
import Purchase from '../../typeorm/schemas/Purchase';

export default class ListStockServiceControllers {
  public async index(request: Request, response: Response): Promise<Purchase[]> {
    const provider_id = request.params.id
    const type = request.user.type




    const listStock = container.resolve(ListCustomerOrders);

    const stockList = await listStock.run({
      provider_id,
      type

    });



    return response.json(classToClass(stockList));

  }
}
