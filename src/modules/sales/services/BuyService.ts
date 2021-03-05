import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import IStockRepository from '../repositories/IStockRepository';
import Purchase from '../infra/typeorm/schemas/Purchase';
import IPurchaseRepository from '../repositories/IPurchaseRepository';

interface IRequest {
  product: string;
  quantity: number;
  provider_id: string;
  client_id: string;
  type: 'client' | 'provider';
}

@injectable()
class BuyService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository,

    @inject('PurchaseRepository')
    private purchaseRepository: IPurchaseRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async run({
    product,
    quantity,
    provider_id,
    client_id,
    type,
  }: IRequest): Promise<Purchase> {
    if (type === 'provider') {
      throw new AppError('Unautorized acess ');
    }

    if (quantity <= 0) {
      throw new AppError('invality imput');
    }

    const matchproduct = await this.stockRepository.matchProduct({
      product,
      provider_id,
    });

    await this.cacheProvider.invalidatePrefix(`shopHistory-list`);

    if (matchproduct === undefined) {
      throw new AppError('unavaliable on stock', 401);
    }

    const attquantity = matchproduct.quantity - quantity;
    matchproduct.quantity = attquantity;

    await this.stockRepository.save(matchproduct);

    if (matchproduct.quantity < 0) {
      const newquantity = matchproduct.quantity + quantity;
      matchproduct.quantity = newquantity;

      await this.stockRepository.save(matchproduct);

      throw new AppError('unavaliable on stock', 401);
    }

    const newprice = matchproduct.price * quantity;

    const status = 'avaliable';

    const price = newprice;

    const transaction_id = await this.purchaseRepository.generateid();

    Object.assign(matchproduct, {
      client_id,
      price,
      quantity,
      status,
      transaction_id,
    });

    return this.purchaseRepository.savePurchase(matchproduct);
  }
}

export default BuyService;
