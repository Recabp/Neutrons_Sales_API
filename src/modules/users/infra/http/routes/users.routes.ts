import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersControllers from '../controllers/UsersController';

const usersRouter = Router();
const usersControllers = new UsersControllers();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      type: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersControllers.create,
);

export default usersRouter;
