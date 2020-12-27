import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import BuyController from '../controllers/BuyController';
import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';





const addStockRouter = Router();
const buyController = new BuyController();

addStockRouter.use(ensureAuthenticated)



addStockRouter.post('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    product: Joi.string().required(),
    quantity: Joi.number().required(),
    type: Joi.string().equal('client')

  }
}), buyController.create);


export default addStockRouter;
