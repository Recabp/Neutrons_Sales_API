import 'reflect-metadata';

import FakeStockRepository from '../repositories/fakes/FakeStockRepository';
import FakePurchaseRepository from '../repositories/fakes/FakePurchaseRepository';
import FakeCacheRepository from '@shared/container/providers/CacheProvider/fakes/FakecacheProvider';
import CancelPurchaseService from './CancelPurchaseService';
import AddStockService from './AddStockService';
import BuyService from './BuyService';
import AppError from '@shared/errors/AppError';





let fakePurchaseRepository: FakePurchaseRepository;
let fakeCacheRepository: FakeCacheRepository;
let fakeStockRepository: FakeStockRepository;
let cancelPurchase: CancelPurchaseService;
let addStock: AddStockService;
let buy: BuyService;






describe('CancelPurchase', () => {
  beforeEach(() => {
    fakeCacheRepository = new FakeCacheRepository();
    fakePurchaseRepository = new FakePurchaseRepository();
    fakeStockRepository = new FakeStockRepository();
    addStock = new AddStockService(fakeStockRepository, fakeCacheRepository);
    cancelPurchase = new CancelPurchaseService(fakeStockRepository, fakePurchaseRepository, fakeCacheRepository);
    buy = new BuyService(fakeStockRepository, fakePurchaseRepository, fakeCacheRepository);



  });


  it('should be able to cancel a purchase', async () => {

    const id = 'asdasdasdasdasd';
    const client = 'dnjkfgçdfmFÇLDFNJDO';
    const provider_id = id;
    const client_id = client
    const type = 'client';


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
      quantity: 4,
      provider_id,
      client_id,

    });

    const transaction_id = purchase.transaction_id



    const cancel = await cancelPurchase.run({ transaction_id, type })



    expect(cancel.status).toEqual('canceled')



  });


  it('Provider should not able to cancel a purchase ', async () => {

    const id = 'asdasdasdasdasd'
    const transaction_id = id
    const type = 'provider'



    await expect(cancelPurchase.run({
      transaction_id,
      type,

    })).rejects.toBeInstanceOf(AppError)


  });


  it('should not be able to cancel a canceled purchase', async () => {

    const id = 'asdasdasdasdasd';
    const client = 'dnjkfgçdfmFÇLDFNJDO';
    const provider_id = id;
    const client_id = client
    const type = 'client';


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

    const transaction_id = purchase.transaction_id



    await cancelPurchase.run({ transaction_id, type })


    await expect(cancelPurchase.run({
      transaction_id, type

    })).rejects.toBeInstanceOf(AppError);



  });


  it('should not be able to cancel a inexistent transaction', async () => {

    const id = 'asdasdasdasdasd';
    const provider_id = id;
    const type = 'client';


    await addStock.run({
      product: 'caldo de cana',
      type: 'provider',
      quantity: 4,
      provider_id,
      price: 2,
    });



    const transaction_id = 'djkanfjasdnfnlasjkdnfklasndklf'




    await expect(cancelPurchase.run({
      transaction_id, type

    })).rejects.toBeInstanceOf(AppError);



  });


  it('should be able to retur a non avaliable product', async () => {


    const type = 'client';




    const purchase = {
      id: "5fe50611f59c1b17e20224d8",
      transaction_id: "15a795b9-65eb-419d-a32f-c6ebeb4a5d14",
      provider_id: "b36c6fe7-3340-4cba-b91b-7b8911e8e603",
      status: "avaliable",
      price: 75,
      client_id: "1cea6083-2fd1-4ec2-af72-6bf56c1c6f6b",
      product: "soda",
      quantity: 15,
      created_at: "2020-12-24T21:20:17.939Z",
      updated_at: "2020-12-24T21:20:17.939Z"

    }

    await fakePurchaseRepository.savePurchase(purchase)

    const transaction_id = "15a795b9-65eb-419d-a32f-c6ebeb4a5d14"



    const cancel = await cancelPurchase.run({ transaction_id, type })



    expect(cancel.status).toEqual('canceled')



  });







});
