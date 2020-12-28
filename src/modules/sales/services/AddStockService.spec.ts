import 'reflect-metadata';

import FakeStockRepository from '../repositories/fakes/FakeStockRepository';
import FakeCacheRepository from '@shared/container/providers/CacheProvider/fakes/FakecacheProvider'
import AddStockService from './AddStockService';
import AppError from '@shared/errors/AppError';






let fakeStockRepository: FakeStockRepository;
let addStock: AddStockService;
let fakeCacheRepository: FakeCacheRepository;




describe('AddStock', () => {
  beforeEach(() => {

    fakeStockRepository = new FakeStockRepository();
    fakeCacheRepository = new FakeCacheRepository();
    addStock = new AddStockService(fakeStockRepository, fakeCacheRepository);


  });


  it('should be able to add new product on the stock', async () => {

    const id = 'asdasdasdasdasd'
    const provider_id = id
    const type = 'provider'


    const newproduct = await addStock.run({
      product: 'caldo de cana',
      quantity: 4,
      provider_id,
      type,
      price: 2,
    })


    expect(newproduct).toHaveProperty('product_id');


  });

  it('should be able to update product on the stock', async () => {

    const id = 'asdasdasdasdasd'
    const provider_id = id
    const type = 'provider'


    const newproduct = await addStock.run({
      product: 'caldo de cana',
      quantity: 4,
      provider_id,
      type,
      price: 2,
    })

    const newproduct2 = await addStock.run({
      product: 'caldo de cana',
      quantity: 2,
      provider_id,
      type,
      price: 2,
    })


    expect(newproduct).toEqual(newproduct2)


  });


  it('should not able to add a negative product on the stock', async () => {

    const id = 'asdasdasdasdasd'
    const provider_id = id
    const type = 'provider'



    await expect(addStock.run({
      product: 'caldo de cana',
      quantity: -4,
      provider_id,
      type,
      price: 2,
    })).rejects.toBeInstanceOf(AppError)


  });




  it('Client should not able to add a product on the stock', async () => {

    const id = 'asdasdasdasdasd'
    const provider_id = id
    const type = 'client'



    await expect(addStock.run({
      product: 'caldo de cana',
      quantity: 4,
      provider_id,
      type,
      price: 2,
    })).rejects.toBeInstanceOf(AppError)


  });

  it('should not able put a negative price on product', async () => {

    const id = 'asdasdasdasdasd'
    const provider_id = id
    const type = 'provider'



    await expect(addStock.run({
      product: 'caldo de cana',
      quantity: 4,
      provider_id,
      type,
      price: -2,
    })).rejects.toBeInstanceOf(AppError)


  });




});
