export const initialState = {
  products: [],
  cartItems: [],
  isLogin: false,
  isLoading: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return { ...state, isLogin: !state.isLogin };
    }
    case "product/get": {
      return { ...state, products: action.payload };
    }
    case "cart/add": {
      const product = action.payload;
      const itemExits = state.cartItems.find(
        (item) => item._id === product._id
      );
      if (itemExits) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === product._id
              ? { ...item, quantity_cart: item.quantity_cart + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...product, quantity_cart: 1 }],
        };
      }
    }
    case "cart/empty": {
      return { ...state, cartItems: [] };
    }
    case "loading": {
      return { ...state, isLoading: !state.isLoading };
    }
    default:
      return state;
  }
};
