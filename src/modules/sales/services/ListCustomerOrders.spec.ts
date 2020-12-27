import 'reflect-metadata';

import FakeStockRepository from '../repositories/fakes/FakeStockRepository';
import FakePurchaseRepository from '../repositories/fakes/FakePurchaseRepository';
import FakeCacheRepository from '@shared/container/providers/CacheProvider/fakes/FakecacheProvider';
import ListCustomerOrders from './ListCustomerOrders';
import AddStockService from './AddStockService';
import BuyService from './BuyService';
import AppError from '@shared/errors/AppError';




let fakeCacheRepository: FakeCacheRepository;
let fakePurchaseRepository: FakePurchaseRepository;
let fakeStockRepository: FakeStockRepository;
let listCustomerOrders: ListCustomerOrders;
let addStock: AddStockService;
let buy: BuyService;






describe('ListCustumerOrder', () => {
  beforeEach(() => {
    fakeCacheRepository = new FakeCacheRepository();
    fakePurchaseRepository = new FakePurchaseRepository();
    fakeStockRepository = new FakeStockRepository();
    addStock = new AddStockService(fakeStockRepository, fakeCacheRepository);
    listCustomerOrders = new ListCustomerOrders(fakePurchaseRepository, fakeCacheRepository);
    buy = new BuyService(fakeStockRepository, fakePurchaseRepository, fakeCacheRepository);



  });


  it('should be able to list the Custumer Order', async () => {

    const id = 'asdasdasdasdasd';
    const client = 'dnjkfgçdfmFÇLDFNJDO';
    const provider_id = id;
    const client_id = client
    const type = 'provider';


    await addStock.run({
      product: 'caldo de cana',
      type: 'provider',
      quantity: 4,
      provider_id,
      price: 2,
    });

    const purchase = await buy.run({
      product: 'caldo de cana',
      type: 'client',
      quantity: 2,
      provider_id,
      client_id,

    });





    const list = await listCustomerOrders.run({ provider_id, type })





    expect(list).toContain(purchase)





  });


  it('Client should not able to list the custumer orders ', async () => {

    const id = 'asdasdasdasdasd'
    const provider_id = id
    const type = 'client'



    await expect(listCustomerOrders.run({
      provider_id,
      type,

    })).rejects.toBeInstanceOf(AppError)


  });






});
