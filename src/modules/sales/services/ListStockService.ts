import { inject, injectable } from 'tsyringe';


import Stock from '@modules/sales/infra/typeorm/schemas/Stock';
import IStockRepository from '../repositories/IStockRepository';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';






interface IRequest {
  provider_id: string;
  type: 'client' | 'provider';
}


@injectable()
class AddStockService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

  ) { }

  public async run({ provider_id, type }: IRequest): Promise<Stock[]> {

    if (type === 'client') {

      throw new AppError('Unautorized acess ')
    }

    let list = await this.cacheProvider.recover<Stock[]>(`stock-list: ${provider_id}`);

    if (!list) {

      list = await this.stockRepository.listStock(provider_id);


      await this.cacheProvider.save(`stock-list: ${provider_id}`, list);

    }






    return list;
  }
}

export default AddStockService;
