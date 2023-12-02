import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDetailApi, getProductsApi } from "../../api/productsApi";

export const getProducts = createAsyncThunk("getProducts", async (page) => {
  const response = await getProductsApi(20, page);
  return response.data.data;
});

export const getProductDetail = createAsyncThunk(
  "getProductDetail",
  async (id) => {
    const response = await getProductDetailApi(id);
    return response.data.data;
  }
);
