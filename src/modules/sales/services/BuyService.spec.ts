import 'reflect-metadata';

import FakeCacheRepository from '@shared/container/providers/CacheProvider/fakes/FakecacheProvider';
import AppError from '@shared/errors/AppError';
import FakeStockRepository from '../repositories/fakes/FakeStockRepository';
import FakePurchaseRepository from '../repositories/fakes/FakePurchaseRepository';
import AddStockService from './AddStockService';
import BuyService from './BuyService';

let fakeCacheRepository: FakeCacheRepository;
let fakePurchaseRepository: FakePurchaseRepository;
let fakeStockRepository: FakeStockRepository;
let addStock: AddStockService;
let buy: BuyService;

describe('ListShopHistory', () => {
  beforeEach(() => {
    fakeCacheRepository = new FakeCacheRepository();
    fakePurchaseRepository = new FakePurchaseRepository();
    fakeStockRepository = new FakeStockRepository();
    addStock = new AddStockService(fakeStockRepository, fakeCacheRepository);
    buy = new BuyService(
      fakeStockRepository,
      fakePurchaseRepository,
      fakeCacheRepository,
    );
  });

  it('should be able to buy', async () => {
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
      type,
      quantity: 2,
      provider_id,
      client_id,
    });

    expect(purchase).toHaveProperty('transaction_id');
  });

  it('Provider should not able to list the client shop history ', async () => {
    const type = 'provider';
    const id = 'asdasdasdasdasd';
    const client = 'dnjkfgçdfmFÇLDFNJDO';
    const provider_id = id;
    const client_id = client;

    await expect(
      buy.run({
        product: 'caldo de cana',
        type,
        quantity: 2,
        provider_id,
        client_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not able to buy a negative product', async () => {
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

    await expect(
      buy.run({
        product: 'caldo de cana',
        type,
        quantity: -2,
        provider_id,
        client_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not able to buy inexistent product', async () => {
    const id = 'asdasdasdasdasd';
    const client = 'dnjkfgçdfmFÇLDFNJDO';
    const provider_id = id;
    const client_id = client;
    const type = 'client';

    await expect(
      buy.run({
        product: 'caldo de cana',
        type,
        quantity: 2,
        provider_id,
        client_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not able to buy more products than the avaliable', async () => {
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

    await expect(
      buy.run({
        product: 'caldo de cana',
        type,
        quantity: 5,
        provider_id,
        client_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
