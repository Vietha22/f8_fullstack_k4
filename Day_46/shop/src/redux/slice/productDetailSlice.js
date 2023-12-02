import { createSlice } from "@reduxjs/toolkit";
import { getProductDetail } from "../middlewares/productMiddleware";

const initialState = {
  productDetail: {},
  status: "idle",
};
export const productDetailSlice = createSlice({
  name: "productDetail", // type action: name/action
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // product detail
    builder.addCase(getProductDetail.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.productDetail = action.payload;
      state.status = "success";
    });
    builder.addCase(getProductDetail.rejected, (state, action) => {
      state.status = "error";
    });
  },
});
