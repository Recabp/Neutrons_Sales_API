import { inject, injectable } from 'tsyringe';


import Purchase from '@modules/sales/infra/typeorm/schemas/Purchase';
import IPurchaseRepository from '../repositories/IPurchaseRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError'






interface IRequest {
  client_id: string;
  type: 'client' | 'provider';
}


@injectable()
class AddStockService {
  constructor(
    @inject('PurchaseRepository')
    private purchaseRepository: IPurchaseRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

  ) { }

  public async run({ client_id, type }: IRequest): Promise<Purchase[]> {

    if (type === 'provider') {

      throw new AppError('Unautorized acess ')
    }
    let list = await this.cacheProvider.recover<Purchase[]>(`shopHistory-list: ${client_id}`);

    if (!list) {


      list = await this.purchaseRepository.listShopHistory(client_id);

      await this.cacheProvider.save(`shopHistory-list: ${client_id}`, list);

    }



    return list;
  }
}

export default AddStockService;
