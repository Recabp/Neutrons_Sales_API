import { inject, injectable } from 'tsyringe';



import IStockRepository from '../repositories/IStockRepository';
import Purchase from '../infra/typeorm/schemas/Purchase';
import IPurchaseRepository from '../repositories/IPurchaseRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError'









interface IRequest {

  transaction_id: string;
  type: 'client' | 'provider';


}



@injectable()
class BuyService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository,

    @inject('PurchaseRepository')
    private purchaseRepository: IPurchaseRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,


  ) { }

  public async run({ transaction_id, type }: IRequest): Promise<Purchase> {

    if (type === 'provider') {

      throw new AppError('Unautorized acess ')
    }




    const findproduct = await this.purchaseRepository.findById(
      transaction_id,
    )



    if (findproduct === undefined) {


      throw new AppError('Unable to find the transaction', 401);



    }

    if (findproduct.status === 'canceled') {

      throw new AppError(' This transaction was already canceled')

    }

    await this.cacheProvider.invalidatePrefix(`stock-list`)
    await this.cacheProvider.invalidatePrefix(`customerOrders`)
    await this.cacheProvider.invalidatePrefix(`shopHistory-list`)


    const product = findproduct.product;
    const provider_id = findproduct.provider_id;
    const quantity = findproduct.quantity;
    const price = findproduct.price;

    const matchproduct = await this.stockRepository.matchProduct({
      product,
      provider_id
    })

    if (matchproduct === undefined) {

      await this.stockRepository.addStock({
        product,
        quantity,
        provider_id,
        price,
      });

      const status = 'canceled'


      Object.assign(findproduct, { status })

      return await this.purchaseRepository.savePurchase(findproduct)



    }


    const newquantity = matchproduct.quantity + quantity

    matchproduct.quantity = newquantity



    await this.stockRepository.save(matchproduct)



    const status = 'canceled'


    Object.assign(findproduct, { status })

    return await this.purchaseRepository.savePurchase(findproduct)




  }



}

export default BuyService;
