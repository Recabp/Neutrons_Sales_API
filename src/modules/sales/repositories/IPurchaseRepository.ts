
import Purchase from "../infra/typeorm/schemas/Purchase";
import IBuyDataDTO from "../dtos/IBuyDataDTO";


export default interface IStockRepository {
  savePurchase(buyData: IBuyDataDTO): Promise<Purchase>;
  listShopHistory(client_id: string): Promise<Purchase[]>;
  listCustumerOrder(provider_id: string): Promise<Purchase[]>;
  findById(transaction_id: string): Promise<Purchase | undefined>;
  generateid(): Promise<string>;



}
