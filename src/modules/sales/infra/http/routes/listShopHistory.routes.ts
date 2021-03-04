import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';
import ListShopHistoryController from '../controllers/ListShopHistoryController';

const listShopHistoryRouter = Router();
const listShopHistoryController = new ListShopHistoryController();

listShopHistoryRouter.use(ensureAuthenticated);

listShopHistoryRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  listShopHistoryController.index,
);

export default listShopHistoryRouter;
