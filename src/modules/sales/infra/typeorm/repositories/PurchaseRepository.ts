import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';

import IPurchaseRepository from '@modules/sales/repositories/IPurchaseRepository';
import IBuyDataDTO from '@modules/sales/dtos/IBuyDataDTO';
import { uuid } from 'uuidv4';
import Purchase from '../schemas/Purchase';

class PurchaseRepository implements IPurchaseRepository {
  private ormRepository: MongoRepository<Purchase>;

  constructor() {
    this.ormRepository = getMongoRepository(Purchase, 'mongo');
  }

  public async savePurchase(productData: IBuyDataDTO): Promise<Purchase> {
    const product = this.ormRepository.create(productData);

    await this.ormRepository.save(product);

    return product;
  }

  public async listShopHistory(client_id: string): Promise<Purchase[]> {
    const stocklist = await this.ormRepository.find({
      where: { client_id },
    });

    return stocklist;
  }

  public async listCustumerOrder(provider_id: string): Promise<Purchase[]> {
    const stocklist = await this.ormRepository.find({
      where: { provider_id },
    });

    return stocklist;
  }

  public async findById(transaction_id: string): Promise<Purchase | undefined> {
    const match = await this.ormRepository.findOne({
      where: { transaction_id },
    });

    return match;
  }

  public async generateid() {
    const id = uuid();

    return id;
  }
}

export default PurchaseRepository;
