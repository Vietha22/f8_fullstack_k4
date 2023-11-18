export const initialState = {
  products: [],
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
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
      const result = {
        ...state,
        cartItems: itemExits
          ? state.cartItems.map((item) =>
              item._id === product._id
                ? {
                    ...item,
                    quantity_cart: item.quantity_cart + 1,
                    quantity: item.quantity - 1,
                  }
                : item
            )
          : [
              ...state.cartItems,
              {
                ...product,
                quantity_cart: 1,
                quantity: product.quantity - 1,
              },
            ],
      };
      localStorage.setItem("cart", JSON.stringify(result.cartItems));
      return result;
    }
    case "cart/empty": {
      localStorage.removeItem("cart");
      const checkout = action.payload;
      return {
        ...state,
        cartItems: [],
        products: state.products.map((product) => {
          checkout.forEach((item) => {
            if (item.productId === product._id) {
              product.quantity = product.quantity - item.quantity;
            }
          });
          return product;
        }),
      };
    }
    case "loading": {
      return { ...state, isLoading: !state.isLoading };
    }
    default:
      return state;
  }
};
