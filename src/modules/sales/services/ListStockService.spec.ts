import 'reflect-metadata';

import FakeCacheRepository from '@shared/container/providers/CacheProvider/fakes/FakecacheProvider';
import AppError from '@shared/errors/AppError';
import FakeStockRepository from '../repositories/fakes/FakeStockRepository';
import ListStockService from './ListStockService';
import AddStockService from './AddStockService';

let fakeCacheRepository: FakeCacheRepository;
let fakeStockRepository: FakeStockRepository;
let listStock: ListStockService;
let addStock: AddStockService;

describe('ListStock', () => {
  beforeEach(() => {
    fakeCacheRepository = new FakeCacheRepository();
    fakeStockRepository = new FakeStockRepository();
    addStock = new AddStockService(fakeStockRepository, fakeCacheRepository);
    listStock = new ListStockService(fakeStockRepository, fakeCacheRepository);
  });

  it('should be able to list the stock', async () => {
    const id = 'asdasdasdasdasd';
    const provider_id = id;
    const type = 'provider';

    const product1 = await addStock.run({
      product: 'caldo de cana',
      type: 'provider',
      quantity: 4,
      provider_id,
      price: 2,
    });

    const product2 = await addStock.run({
      product: 'pastel',
      type: 'provider',
      quantity: 4,
      provider_id,
      price: 3,
    });

    const list = await listStock.run({ provider_id, type });

    expect(list).toEqual([product1, product2]);
  });

  it('Client should not able to list the stock', async () => {
    const id = 'asdasdasdasdasd';
    const provider_id = id;
    const type = 'client';

    await expect(
      listStock.run({
        provider_id,
        type,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
