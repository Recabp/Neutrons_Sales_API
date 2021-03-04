import IProductDTO from '../dtos/IProductDTO';
import IProductInfoDTO from '../dtos/IProductsInfoDTO';
import Stock from '../infra/typeorm/schemas/Stock';

export default interface IStockRepository {
  addStock(provider_id: IProductDTO): Promise<Stock>;
  listStock(provider_id: string): Promise<Stock[]>;
  matchProduct(productData: IProductInfoDTO): Promise<Stock | undefined>;
  save(stock: Stock): Promise<Stock>;
  delete(stock: Stock): Promise<void>;
}
