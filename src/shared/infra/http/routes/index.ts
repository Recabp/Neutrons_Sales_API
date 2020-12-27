import { Router } from 'express';

import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import updateUserRouter from '@modules/users/infra/http/routes/updateUser.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import listprovidersRouter from '@modules/users/infra/http/routes/listproviders.routes';
import addStockRouter from '@modules/sales/infra/http/routes/addStock.routes';
import listStockRouter from '@modules/sales/infra/http/routes/listStock.routes';
import listProductsRouter from '@modules/sales/infra/http/routes/listProducts.routes';
import buyProductsRouter from '@modules/sales/infra/http/routes/buyProducts.routes';
import cancelPurchaseRouter from '@modules/sales/infra/http/routes/cancelPurchase.routes';
import listCustomerRouter from '@modules/sales/infra/http/routes/listCustomerOrder.routes';
import listShopHistoryRouter from '@modules/sales/infra/http/routes/listShopHistory.routes';




const routes = Router();


routes.use('/list', listprovidersRouter);
routes.use('/users', usersRouter);
routes.use('/updateuser', updateUserRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/addstock', addStockRouter);
routes.use('/liststock', listStockRouter);
routes.use('/listproducts', listProductsRouter);
routes.use('/buy', buyProductsRouter);
routes.use('/cancel', cancelPurchaseRouter);
routes.use('/shophistory', listShopHistoryRouter);
routes.use('/custumerorder', listCustomerRouter);




export default routes;
