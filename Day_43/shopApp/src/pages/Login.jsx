//Import từ node_modules
import React, { useState } from "react";
import { toast } from "react-toastify";

//Import từ project
import { useDispatch } from "../core/hook";

//Import api
import { authApi } from "../api/auth";
import { getProductsApi } from "../api/productsApi";
import { client } from "../utils/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const updateValue = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email);
    setEmail("");
  };

  const handleLogin = async (email) => {
    try {
      dispatch({ type: "loading" });
      const { data } = await authApi(email);
      if (data.code === 400) {
        throw new Error(data.message);
      }
      localStorage.setItem("apiKey", data.data.apiKey);
      client.setApiKey(data.data.apiKey);
      localStorage.setItem("userEmail", email);
      const { data: dataProduct } = await getProductsApi(8);
      const { listProduct } = dataProduct.data;
      dispatch({ type: "product/get", payload: listProduct });
      dispatch({ type: "login" });
      dispatch({ type: "loading" });
    } catch (e) {
      dispatch({ type: "loading" });
      toast.error(e.message);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-300 fixed inset-0 flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          value={email}
          onChange={updateValue}
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="example@example.com"
        />
        <button
          type="submit"
          className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
