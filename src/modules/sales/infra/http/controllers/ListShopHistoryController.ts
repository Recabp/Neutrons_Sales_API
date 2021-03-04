import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListShopHistory from '@modules/sales/services/ListShopHistory';
import Purchase from '../../typeorm/schemas/Purchase';

export default class ListStockServiceControllers {
  public async index(
    request: Request,
    response: Response,
  ): Promise<Purchase[]> {
    const client_id = request.params.id;
    const { type } = request.user;

    const listStock = container.resolve(ListShopHistory);

    const stockList = await listStock.run({
      client_id,
      type,
    });

    return response.json(classToClass(stockList));
  }
}
