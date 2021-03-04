import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';
import ListCustomerOrderController from '../controllers/ListCustomerOrderController';

const listCustomerRouter = Router();
const listCustomerOrderController = new ListCustomerOrderController();

listCustomerRouter.use(ensureAuthenticated);

listCustomerRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  listCustomerOrderController.index,
);

export default listCustomerRouter;
