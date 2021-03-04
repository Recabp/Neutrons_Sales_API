import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';
import ListProvidersControllers from '../controllers/ListProvidersController';

const ListProvidersRouter = Router();
const ListProvidersController = new ListProvidersControllers();

ListProvidersRouter.use(ensureAuthenticated);

ListProvidersRouter.get('/', ListProvidersController.index);

export default ListProvidersRouter;
