import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Loader from "./components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { authApi, getUserApi } from "./api/auth.js";
import { getProductsApi, ordersProductsApi } from "./api/productsApi.js";
import Login from "./pages/Login.jsx";
import { client } from "./utils/client.js";

function App() {
  // Giả định này có thể thay thế bằng dữ liệu từ một API hoặc cơ sở dữ liệu
  const [products, setProducts] = useState([
    // Thêm một số sản phẩm mẫu vào đây
    // ...
  ]);

  // Trạng thái cho giỏ hàng
  const [cartItems, setCartItems] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const apiKey = localStorage.getItem("apiKey");
    if (!apiKey) {
      setIsLogin(false);
    }

    if (apiKey) {
      try {
        setIsLoading(true);
        setIsLogin(true);
        const { data: dataUser } = await getUserApi();

        if (dataUser.code === 401) {
          throw new Error("Lỗi");
        }

        const { data } = await getProductsApi(8);
        const { listProduct } = data.data;
        const { name } = dataUser.data.emailId;
        setProducts(listProduct);
        setIsLoading(false);

        toast.success(`Chào mừng bạn ${name}`);
      } catch (e) {
        setIsLogin(false);
        toast.error("Vui lòng đăng nhập lại để tiếp tục");
        setIsLoading(false);
      }
    }
  };

  const handleLogin = async (email) => {
    try {
      setIsLoading(true);
      const { data } = await authApi(email);
      if (data.code === 400) {
        throw new Error(data.message);
      }
      localStorage.setItem("apiKey", data.data.apiKey);
      client.setApiKey(data.data.apiKey);
      localStorage.setItem("userEmail", email);
      const { data: dataProduct } = await getProductsApi(8);
      const { listProduct } = dataProduct.data;
      setProducts(listProduct);
      setIsLogin(true);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error(e.message);
    }
  };

  // Xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      toast.success("Đã thêm một sản phẩm vào giỏ hàng");
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
    try {
      setIsLoading(true);
      const checkOut = cartItems.map((item) => {
        const { _id: productId, quantity } = item;
        return { productId, quantity };
      });
      const { data } = await ordersProductsApi(checkOut);
      if (data.code === 401) {
        throw new Error("Lỗi");
      }
      setCartItems([]);
      toast.info("Đã thanh toán");
      setIsLoading(false);
    } catch (e) {
      setIsLogin(false);
      toast.error("Vui lòng đăng nhập lại để tiếp tục");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLogin ? (
        <main className="flex items-center justify-center p-8">
          <div className="container bg-slate-700 p-4 flex flex-col justify-center items-center">
            <h1 className="font-bold text-white">Welcome to Shop!</h1>
            <ProductList products={products} onAddToCart={handleAddToCart} />
            <Cart cartItems={cartItems} onCheckout={handleCheckout} />
          </div>
        </main>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {isLoading && <Loader />}
      <ToastContainer />
    </>
  );
}

export default App;
