import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList/TodoList";
import AddTodo from "./components/AddTodo/AddTodo";
import Loader from "./components/Loader/Loader";
import SearchTodo from "./components/SearchTodo/SearchTodo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  addTodoApi,
  deleteTodoApi,
  editTodoApi,
  getListTodo,
  searchTodoApi,
} from "./api/todo";
import { authApi } from "./api/auth";
import { client } from "./utils/client";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!apiKey || !userEmail) {
        const email = prompt(
          "Please enter your email:",
          "halongviet22@gmail.com"
        );
        const patternEmail = /^([\w\.-]{3,}@[\w\.-]{1,}\.[a-z]{2,})$/;
        if (patternEmail.test(email)) {
          try {
            setIsLoading(true);
            const { data } = await authApi(email);
            if (data.code === 400) {
              throw new Error(data.message);
            }
            const { apiKey } = data.data;
            localStorage.setItem("apiKey", apiKey);
            localStorage.setItem("userEmail", email);
            setApiKey(apiKey);
            setUserEmail(email);
            // location.reload();
            client.apiKey = apiKey;
            toast.success(
              `Chào mừng bạn ${email.slice(0, email.indexOf("@"))}`
            );
            const { data: data1 } = await getListTodo();
            const todos = data1?.data?.listTodo;
            setTodos(todos);
            setIsLoading(false);
          } catch (e) {
            toast.error(e.message);
            setIsLoading(false);
            setTimeout(() => {
              location.reload();
            }, 3000);
          }
        } else {
          toast.error("Invalid email");
          setTimeout(() => {
            location.reload();
          }, 3000);
        }
      }

      if (apiKey) {
        try {
          const email = localStorage.getItem("userEmail");
          setIsLoading(true);
          const { data } = await getListTodo();
          if (data.code === 401) {
            throw new Error("Lỗi");
          }
          toast.success(
            `Chào mừng bạn quay trở lại ${email.slice(0, email.indexOf("@"))}`
          );
          const todos = data?.data?.listTodo;
          setTodos(todos);
          setIsLoading(false);
        } catch (e) {
          localStorage.clear();
          location.reload();
        }
      }
    };

    fetchData();
  }, []);

  const addTodo = async (newTodo) => {
    try {
      setIsLoading(true);
      const { data } = await addTodoApi(newTodo);
      if (data.code === 401) {
        throw new Error("Có lỗi xảy ra, vui lòng reload lại");
      }
      toast.success("Thêm todo thành công!");
      // const todo = data?.data;
      // setTodos([todo, ...todos]);
      const { data: data1 } = await getListTodo();
      if (data.code === 401) {
        throw new Error("Lỗi 1");
      }
      setTodos(data1.data.listTodo);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error(e.message);
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await deleteTodoApi(id);
      if (data.code === 401) {
        throw new Error("Xóa todo thất bại");
      }
      toast.success("Xóa todo thành công!");

      setTodos(todos.filter((todo) => todo._id !== id));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error(e.message);
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  };

  const editTodo = async (todo) => {
    try {
      setIsLoading(true);
      const { data } = await editTodoApi(todo);
      if (data.code === 401) {
        throw new Error("Cập nhật todo thất bại");
      }
      toast.success("Update todo thành công!");

      setTodos(
        todos.map((item) =>
          item._id === todo._id
            ? { ...item, todo: todo.todo, isCompleted: todo.isCompleted }
            : item
        )
      );
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error(e.message);
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  };

  const searchTodo = async (query) => {
    try {
      setIsLoading(true);
      const { data } = await searchTodoApi(query);
      if (data.code === 401) {
        throw new Error("Lỗi");
      }
      setTodos(data.data.listTodo);
      setIsLoading(false);
    } catch (e) {}
  };

  return (
    <main className="flex items-center justify-center p-8">
      <div className="container bg-slate-700 p-4 flex flex-col justify-center items-center">
        <h1 className="font-bold text-white">Welcome to TodoApp!</h1>
        <SearchTodo searchTodo={searchTodo} />
        <AddTodo addTodo={addTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />
      </div>
      {isLoading && <Loader />}
      <ToastContainer />
    </main>
  );
};

export default App;
