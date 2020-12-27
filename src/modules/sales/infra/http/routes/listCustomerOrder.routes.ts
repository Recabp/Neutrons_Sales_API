import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';


import ListCustomerOrderController from '../controllers/ListCustomerOrderController';
import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';






const listCustomerRouter = Router();
const listCustomerOrderController = new ListCustomerOrderController();

listCustomerRouter.use(ensureAuthenticated)




listCustomerRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  }
}), listCustomerOrderController.index);


export default listCustomerRouter;
