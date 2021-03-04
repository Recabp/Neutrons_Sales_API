import { inject, injectable } from 'tsyringe';

import Purchase from '@modules/sales/infra/typeorm/schemas/Purchase';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import IPurchaseRepository from '../repositories/IPurchaseRepository';

interface IRequest {
  provider_id: string;
  type: 'client' | 'provider';
}

@injectable()
class AddStockService {
  constructor(
    @inject('PurchaseRepository')
    private purchaseRepository: IPurchaseRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async run({ provider_id, type }: IRequest): Promise<Purchase[]> {
    if (type === 'client') {
      throw new AppError('Unautorized acess ');
    }

    let list = await this.cacheProvider.recover<Purchase[]>(
      `customerOrders-list: ${provider_id}`,
    );

    if (!list) {
      list = await this.purchaseRepository.listCustumerOrder(provider_id);

      await this.cacheProvider.save(
        `customerOrders-list: ${provider_id}`,
        list,
      );
    }

    return list;
  }
}

export default AddStockService;
