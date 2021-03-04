import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';
import CancelPurchaseController from '../controllers/CancelPurchaseController';

const cancelPurchaseRouter = Router();
const cancelPurchaseController = new CancelPurchaseController();

cancelPurchaseRouter.use(ensureAuthenticated);

cancelPurchaseRouter.post(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  cancelPurchaseController.create,
);

export default cancelPurchaseRouter;
