import { client } from "../utils/client";

export const getProductsApi = (limit, currentPage) => {
  return client.get(`/products?limit=${limit}&page=${currentPage}`);
};

export const getProductDetailApi = (id) => {
  return client.get(`/products/${id}`);
};
