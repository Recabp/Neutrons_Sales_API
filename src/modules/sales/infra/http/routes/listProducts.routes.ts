import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';
import ListStockForUsersController from '../controllers/ListStockForUsersController';

const listProductsRouter = Router();
const listStockForUsersController = new ListStockForUsersController();

listProductsRouter.use(ensureAuthenticated);

listProductsRouter.get(
  '/:id/products',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  listStockForUsersController.index,
);

export default listProductsRouter;
