import { inject, injectable } from 'tsyringe';

import Stock from '@modules/sales/infra/typeorm/schemas/Stock';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import IStockRepository from '../repositories/IStockRepository';

interface IRequest {
  product: string;
  quantity: number;
  provider_id: string;
  price: number;
  type: 'client' | 'provider';
}

@injectable()
class AddStockService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async run({
    product,
    quantity,
    provider_id,
    price,
    type,
  }: IRequest): Promise<Stock> {
    if (type === 'client') {
      throw new AppError('Unautorized acess ');
    }

    if (quantity <= 0) {
      throw new AppError('invality imput');
    }

    if (price <= 0) {
      throw new AppError('invality imput');
    }

    const matchproduct = await this.stockRepository.matchProduct({
      product,
      provider_id,
    });

    if (matchproduct === undefined) {
      const matchproduct = await this.stockRepository.addStock({
        product,
        quantity,
        provider_id,
        price,
      });

      return matchproduct;
    }

    const newquantity = matchproduct.quantity + quantity;
    matchproduct.quantity = newquantity;

    await this.cacheProvider.invalidatePrefix(`stock-list`);

    return this.stockRepository.save(matchproduct);
  }
}

export default AddStockService;
