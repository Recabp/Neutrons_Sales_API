import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';
import AddStockController from '../controllers/AddStockController';

const addStockRouter = Router();
const addStockController = new AddStockController();

addStockRouter.use(ensureAuthenticated);

addStockRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      product: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      type: Joi.string().equal('provider').required(),
    },
  }),
  addStockController.create,
);

export default addStockRouter;
