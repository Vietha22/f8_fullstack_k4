import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: [],
  status: "idle",
};
export const cartSlice = createSlice({
  name: "cart", // type action: name/action
  initialState,
  reducers: {
    add: (state, action) => {
      const product = action.payload;
      const itemExits = state.cartList.find((item) => item._id === product._id);
      state.cartList = itemExits
        ? state.cartList.map((item) =>
            item._id === product._id
              ? {
                  ...item,
                  quantity_cart: item.quantity_cart + 1,
                  quantity: item.quantity - 1,
                }
              : item
          )
        : [
            ...state.cartList,
            { ...product, quantity_cart: 1, quantity: product.quantity - 1 },
          ];
    },
    decrement: (state, action) => {
      const id = action.payload;
      state.cartList = state.cartList.map((item) => {
        if (item._id === id) {
          if (item.quantity_cart === 1) {
            return { ...item };
          }
          return { ...item, quantity_cart: item.quantity_cart - 1 };
        }
        return item;
      });
    },
    increment: (state, action) => {
      const id = action.payload;
      state.cartList = state.cartList.map((item) =>
        item._id === id
          ? { ...item, quantity_cart: item.quantity_cart + 1 }
          : item
      );
    },
    remove: (state, action) => {
      const id = action.payload;
      state.cartList = state.cartList.filter((item) => item._id !== id);
    },
    checkout: (state, action) => {
      state.cartList = [];
    },
  },
});
