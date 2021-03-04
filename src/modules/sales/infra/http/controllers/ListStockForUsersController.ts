import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListStockService from '@modules/sales/services/ListStockService';
import Stock from '../../typeorm/schemas/Stock';

export default class ListStockServiceControllers {
  public async index(request: Request, response: Response): Promise<Stock[]> {
    const provider_id = request.params.id;
    const { type } = request.user;

    const listStock = container.resolve(ListStockService);

    const stockList = await listStock.run({
      provider_id,
      type,
    });

    return response.json(classToClass(stockList));
  }
}
