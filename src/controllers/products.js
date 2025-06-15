import createHttpError from 'http-errors';
import {
  getAllProductsService,
  getProductByIdService,
  deleteProductByIdService,
  createProductService,
  updateProduct,
} from '../services/products.js';

export const getAllProductsController = async (req, res) => {
  const products = await getAllProductsService();
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};
export const getProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const product = await getProductByIdService(productId);

  res.json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const payload = req.body;
  const newProduct = await createProductService(payload);
  if (!newProduct) {
    throw createHttpError(500, 'Failed to create product');
  }
  res.status(201).json({
    status: 201,
    message: `Successfully created product with id ${newProduct._id}!`,
    data: newProduct,
  });
};

export const upsertProductController = async (req, res) => {
  const { productId } = req.params;
  const { product, isNew } = await updateProduct(productId, req.body, {
    upsert: true,
  });
  const status = isNew ? 201 : 200;

  return res.status(status).json({
    message: `Successfully updated product with id ${productId}!`,
    status,
    data: product,
  });
};

export const patchProductController = async (req, res) => {
  const { productId } = req.params;

  const { product } = await updateProduct(productId, req.body, {
    upsert: false,
  });

  res.json({
    status: 200,
    message: `Successfully patched a product with id ${productId}!`,
    data: product,
  });
};

export const deleteProductController = async (req, res) => {
  const { productId } = req.params;
  const deletedProduct = await deleteProductByIdService(productId);
  if (!deletedProduct) {
    throw createHttpError(404, `Product with id ${productId} not found`);
  }
  res.status(204).send();
};
