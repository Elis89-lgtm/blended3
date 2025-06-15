import createHttpError from 'http-errors';
import { Product } from '../db/productModel.js';

export const getAllProductsService = async () => {
  const products = await Product.find();

  return products;
};

export const getProductByIdService = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found!');
  }

  return product;
};
export const createProductService = async (payload) => {
  const newProduct = await Product.create(payload);

  return newProduct;
};

export const updateProduct = async (productId, payload, options = {}) => {
  const result = await Product.findByIdAndUpdate({ _id: productId }, payload, {
    ...options,
    new: true,
    includeResultMetadata: true,
    runValidators: true,
  });
  if (!result.value) {
    throw createHttpError(404, 'Product not found!');
  }
  return {
    product: result.value,
    isNew: !result.lastErrorObject.updatedExisting,
  };
};

export const deleteProductByIdService = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};
