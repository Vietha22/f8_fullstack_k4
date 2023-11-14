import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

import { authApi } from "./api/auth.js";
import { getProductsApi, ordersProductsApi } from "./api/productsApi.js";

function App() {
  // Giả định này có thể thay thế bằng dữ liệu từ một API hoặc cơ sở dữ liệu
  const [products, setProducts] = useState([
    // Thêm một số sản phẩm mẫu vào đây
    // ...
  ]);

  // Trạng thái cho giỏ hàng
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Tại đây bạn có thể tải sản phẩm từ một API nếu cần
    // fetchProducts();
    const apiKey = localStorage.getItem("apiKey");
    const fetchData = async () => {
      if (!apiKey) {
        const email = prompt(
          "Please enter your email:",
          "halongviet22@gmail.com"
        );
        const patternEmail = /^([\w\.-]{3,}@[\w\.-]{1,}\.[a-z]{2,})$/;
        if (patternEmail.test(email)) {
          const { data } = await authApi(email);
          localStorage.setItem("apiKey", data.data.apiKey);
        }
      }

      if (apiKey) {
        const { data } = await getProductsApi(8);
        const { listProduct } = data.data;
        setProducts(listProduct);
      }
    };

    fetchData();
  }, []);

  // Xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const itemExists = prevItems.find((item) => item._id === product._id);
      if (itemExists) {
        // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Xử lý thanh toán giỏ hàng
  const handleCheckout = async () => {
    // Logic thanh toán sẽ được xử lý ở đây
    // Đơn giản là reset giỏ hàng sau khi thanh toán cho mục đích minh họa
    const data = cartItems.map((item) => {
      const { _id: productId, quantity } = item;
      return { productId, quantity };
    });
    await ordersProductsApi(data);
    setCartItems([]);
    alert("Cảm ơn bạn đã thanh toán!");
  };

  return (
    <main className="flex items-center justify-center p-8">
      <div className="container bg-slate-700 p-4 flex flex-col justify-center items-center">
        <h1 className="font-bold text-white">Welcome to Shop!</h1>
        <ProductList products={products} onAddToCart={handleAddToCart} />
        <Cart cartItems={cartItems} onCheckout={handleCheckout} />
      </div>
    </main>
  );
}

export default App;
