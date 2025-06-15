import { Router } from 'express';

import {
  getAllProductsController,
  getProductByIdController,
  deleteProductController,
  createProductController,
  upsertProductController,
  patchProductController,
} from '../controllers/products.js';

const productsRouter = Router();

productsRouter.get('/', getAllProductsController);
productsRouter.get('/:productId', getProductByIdController);
productsRouter.post('/', createProductController);
productsRouter.patch('/:productId', patchProductController);
productsRouter.put('/:productId', upsertProductController);
productsRouter.delete('/:productId', deleteProductController);

export default productsRouter;
