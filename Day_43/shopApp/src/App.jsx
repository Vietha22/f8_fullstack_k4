//Import từ node_modules
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

//Import css
import "react-toastify/dist/ReactToastify.css";

//Import component, page
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Login from "./pages/Login.jsx";
import Loader from "./components/Loader/Loader";
import { useDispatch, useSelector } from "./core/hook.js";

//Import api
import { getUserApi } from "./api/auth.js";
import { getProductsApi } from "./api/productsApi.js";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const apiKey = localStorage.getItem("apiKey");

    if (apiKey) {
      try {
        dispatch({
          type: "loading",
        });
        dispatch({
          type: "login",
        });

        const { data: dataUser } = await getUserApi();

        if (dataUser.code === 401) {
          throw new Error("Lỗi");
        }

        const { data } = await getProductsApi(8);
        const { listProduct } = data.data;
        const { name } = dataUser.data.emailId;

        dispatch({
          type: "product/get",
          payload: listProduct,
        });
        dispatch({
          type: "loading",
        });
        toast.success(`Chào mừng bạn ${name}`);
      } catch (e) {
        dispatch({
          type: "login",
        });
        dispatch({
          type: "loading",
        });
        toast.error("Vui lòng đăng nhập lại để tiếp tục");
      }
    }
  };

  return (
    <>
      {isLogin ? (
        <main className="flex items-center justify-center p-8">
          <div className="container bg-slate-700 p-4 flex flex-col justify-center items-center">
            <h1 className="font-bold text-white">Welcome to Shop!</h1>
            <ProductList />
            <Cart />
          </div>
        </main>
      ) : (
        <Login />
      )}
      {isLoading && <Loader />}
      <ToastContainer />
    </>
  );
}

export default App;
