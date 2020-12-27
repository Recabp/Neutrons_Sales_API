import { container } from 'tsyringe';


import '@modules/users/providers';
import './providers'


import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUserTokensReposytory from '@modules/users/repositories/IUserTokensRepository';


import StockRepository from '@modules/sales/infra/typeorm/repositories/StockRepository';
import IStockRepository from '@modules/sales/repositories/IStockRepository';

import PurchaseRepository from '@modules/sales/infra/typeorm/repositories/PurchaseRepository';
import IPurchaseRepository from '@modules/sales/repositories/IPurchaseRepository';







container.registerSingleton<IUsersRepository>(
  'UsersRepository', UsersRepository);


container.registerSingleton<IUserTokensReposytory>(
  'UserTokensRepository', UserTokensRepository);

container.registerSingleton<IStockRepository>(
  'StockRepository', StockRepository);

container.registerSingleton<IPurchaseRepository>(
  'PurchaseRepository', PurchaseRepository);


