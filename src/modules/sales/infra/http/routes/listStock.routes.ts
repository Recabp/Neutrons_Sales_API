import { Router } from 'express';


import ListStockController from '../controllers/ListStockController';
import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';






const listStockRouter = Router();
const addStockController = new ListStockController();

listStockRouter.use(ensureAuthenticated)




listStockRouter.get('/', addStockController.index);


export default listStockRouter;
