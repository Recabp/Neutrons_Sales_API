import IStockRepository from '@modules/sales/repositories/IStockRepository';
import IProductDTO from '@modules/sales/dtos/IProductDTO';
import IProductsInfoDTO from '@modules/sales/dtos/IProductsInfoDTO';
import { uuid } from 'uuidv4';
import Stock from '../../infra/typeorm/schemas/Stock';

class FakeStockRepository implements IStockRepository {
  private stock: Stock[] = [];

  public async addStock(userData: IProductDTO): Promise<Stock> {
    const product = new Stock();

    Object.assign(product, { product_id: uuid() }, userData);

    this.stock.push(product);

    return product;
  }

  public async listStock(provider_id: string): Promise<Stock[]> {
    const listStock = this.stock.filter(
      stock => stock.provider_id === provider_id,
    );

    return listStock;
  }

  public async matchProduct({
    product,
    provider_id,
  }: IProductsInfoDTO): Promise<Stock | undefined> {
    const match = this.stock.find(
      stock => stock.provider_id === provider_id && stock.product === product,
    );

    return match;
  }

  public async save(stock: Stock): Promise<Stock> {
    const findIndex = this.stock.findIndex(
      findStock => findStock.product === stock.product,
    );

    this.stock[findIndex] = stock;

    return stock;
  }

  public async delete(stock: Stock): Promise<void> {
    const dell = this.stock.indexOf(stock);

    this.stock.splice(dell, 5);
  }
}

export default FakeStockRepository;
