import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slice/productSlice";
import { cartSlice } from "./slice/cartSlice";
import { productDetailSlice } from "./slice/productDetailSlice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    productDetail: productDetailSlice.reducer,
  },
});
