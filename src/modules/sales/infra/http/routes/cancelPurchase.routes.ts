import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CancelPurchaseController from '../controllers/CancelPurchaseController';
import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';





const cancelPurchaseRouter = Router();
const cancelPurchaseController = new CancelPurchaseController();

cancelPurchaseRouter.use(ensureAuthenticated)



cancelPurchaseRouter.post('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  },

}), cancelPurchaseController.create);


export default cancelPurchaseRouter;
