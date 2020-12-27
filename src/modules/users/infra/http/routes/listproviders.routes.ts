import { Router } from 'express';


import ListProvidersControllers from '../controllers/ListProvidersController'
import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';

const ListProvidersRouter = Router();
const ListProvidersController = new ListProvidersControllers()

ListProvidersRouter.use(ensureAuthenticated)

ListProvidersRouter.get('/', ListProvidersController.index);


export default ListProvidersRouter;
