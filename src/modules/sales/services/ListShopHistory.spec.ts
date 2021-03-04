import 'reflect-metadata';

import FakeCacheRepository from '@shared/container/providers/CacheProvider/fakes/FakecacheProvider';
import AppError from '@shared/errors/AppError';
import FakeStockRepository from '../repositories/fakes/FakeStockRepository';
import FakePurchaseRepository from '../repositories/fakes/FakePurchaseRepository';
import ListShopHistory from './ListShopHistory';
import AddStockService from './AddStockService';
import BuyService from './BuyService';

let fakeCacheRepository: FakeCacheRepository;
let fakePurchaseRepository: FakePurchaseRepository;
let fakeStockRepository: FakeStockRepository;
let listShopHistory: ListShopHistory;
let addStock: AddStockService;
let buy: BuyService;

describe('ListShopHistory', () => {
  beforeEach(() => {
    fakeCacheRepository = new FakeCacheRepository();
    fakePurchaseRepository = new FakePurchaseRepository();
    fakeStockRepository = new FakeStockRepository();
    addStock = new AddStockService(fakeStockRepository, fakeCacheRepository);
    listShopHistory = new ListShopHistory(
      fakePurchaseRepository,
      fakeCacheRepository,
    );
    buy = new BuyService(
      fakeStockRepository,
      fakePurchaseRepository,
      fakeCacheRepository,
    );
  });

  it('should be able to list the Shop History', async () => {
    const id = 'asdasdasdasdasd';
    const client = 'dnjkfgçdfmFÇLDFNJDO';
    const provider_id = id;
    const client_id = client;
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

    const list = await listShopHistory.run({ client_id, type });

    expect(list).toContain(purchase);
  });

  it('Provider should not able to list the client shop history ', async () => {
    const id = 'asdasdasdasdasd';
    const client_id = id;
    const type = 'provider';

    await expect(
      listShopHistory.run({
        client_id,
        type,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
