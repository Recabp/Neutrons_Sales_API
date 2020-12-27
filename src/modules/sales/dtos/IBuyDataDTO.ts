export default interface IProductDTO {
  product: string,
  quantity?: number;
  provider_id: string;
  client_id?: string;
  price?: number;
  transaction_id?: string;

}
