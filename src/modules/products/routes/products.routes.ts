import { Router } from 'express';
import ProductsController from '../controller/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate'; // midleware que trabalha com o express para validações;

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.show,
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create,
);

productsRouter.put('/:id', productsController.update);

productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
