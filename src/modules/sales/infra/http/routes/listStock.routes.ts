import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';
import ListStockController from '../controllers/ListStockController';

const listStockRouter = Router();
const addStockController = new ListStockController();

listStockRouter.use(ensureAuthenticated);

listStockRouter.get('/', addStockController.index);

export default listStockRouter;
