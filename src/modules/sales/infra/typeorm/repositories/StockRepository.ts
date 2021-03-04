import { getMongoRepository, MongoRepository } from 'typeorm';

import IStockRepository from '@modules/sales/repositories/IStockRepository';
import IProductDTO from '@modules/sales/dtos/IProductDTO';
import Stock from '@modules/sales/infra/typeorm/schemas/Stock';

class StockRepository implements IStockRepository {
  private ormRepository: MongoRepository<Stock>;

  constructor() {
    this.ormRepository = getMongoRepository(Stock, 'mongo');
  }

  public async addStock(productData: IProductDTO): Promise<Stock> {
    const product = this.ormRepository.create(productData);

    await this.ormRepository.save(product);

    return product;
  }

  public async listStock(provider_id: string): Promise<Stock[]> {
    const stocklist = await this.ormRepository.find({
      where: { provider_id },
    });

    return stocklist;
  }

  public async matchProduct({
    product,
    provider_id,
  }: IProductDTO): Promise<Stock | undefined> {
    const match = await this.ormRepository.findOne({
      where: { provider_id, product },
    });

    return match;
  }

  public async save(stock: Stock): Promise<Stock> {
    return this.ormRepository.save(stock);
  }

  public async delete(stock: Stock): Promise<void> {
    this.ormRepository.delete(stock);
  }
}

export default StockRepository;
