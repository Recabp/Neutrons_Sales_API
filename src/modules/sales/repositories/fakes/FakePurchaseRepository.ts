import IPurchaseRepository from '@modules/sales/repositories/IPurchaseRepository';
import IBuyDataDTO from '@modules/sales/dtos/IBuyDataDTO';
import { uuid } from 'uuidv4';
import Purchase from '../../infra/typeorm/schemas/Purchase';

class FakePurchaseRepository implements IPurchaseRepository {
  private purchase: Purchase[] = [];

  constructor() {}

  public async savePurchase(userData: IBuyDataDTO): Promise<Purchase> {
    const product = new Purchase();

    Object.assign(product, { product_id: uuid() }, userData);

    this.purchase.push(product);

    return product;
  }

  public async listShopHistory(client_id: string): Promise<Purchase[]> {
    const list = this.purchase.filter(
      purchase => purchase.client_id === client_id,
    );

    return list;
  }

  public async listCustumerOrder(provider_id: string): Promise<Purchase[]> {
    const list = this.purchase.filter(
      purchase => purchase.provider_id === provider_id,
    );

    return list;
  }

  public async findById(transaction_id: string): Promise<Purchase | undefined> {
    const findTransaction = this.purchase.find(
      purchase => purchase.transaction_id === transaction_id,
    );

    return findTransaction;
  }

  public async generateid() {
    const id = uuid();

    return id;
  }
}

export default FakePurchaseRepository;
