import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../middlewares/productMiddleware";

const initialState = {
  productList: [],
  totalPage: 0,
  status: "idle",
};
export const productSlice = createSlice({
  name: "product", // type action: name/action
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // product list
    builder.addCase(getProducts.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.productList = action.payload.listProduct;
      state.totalPage = action.payload.totalPage;
      state.status = "success";
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = "error";
    });
  },
});
