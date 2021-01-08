import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UpdateUserController from '../controllers/UpdateUserController';
import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated'





const updateUserRouter = Router();
const updateUserController = new UpdateUserController();


updateUserRouter.use(ensureAuthenticated)



updateUserRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string().required(),
    password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password')),
  }
}), updateUserController.create);


export default updateUserRouter;
