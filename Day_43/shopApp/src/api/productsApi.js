import { client } from "../utils/client";

export const ordersProductsApi = (data) => {
  return client.post("/orders", data);
};

export const getProductsApi = (limit) => {
  return client.get(`/products?limit=${limit}`);
};
