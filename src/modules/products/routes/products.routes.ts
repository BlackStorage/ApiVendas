import { Router } from 'express';
import ProductsController from '../controller/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.show);
productsRouter.post('/', productsController.create);
productsRouter.put('/:id', productsController.update);
productsController.delete('/:id', productsController.delete);

export default productsRouter;
