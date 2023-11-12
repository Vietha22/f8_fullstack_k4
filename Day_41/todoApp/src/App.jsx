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

const App = () => {
  const [todos, setTodos] = useState([]);
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!apiKey || !userEmail) {
        // ... Xử lý giống như trong componentDidMount
        const email = prompt(
          "Please enter your email:",
          "halongviet22@gmail.com"
        );
        const patternEmail = /^([\w\.-]{3,}@[\w\.-]{1,}\.[a-z]{2,})$/;
        if (patternEmail.test(email)) {
          try {
            setIsLoading(true);
            const { data } = await authApi(email);
            if (data.code === 401) {
              throw new Error("Lỗi");
            }
            const { apiKey } = data.data;
            localStorage.setItem("apiKey", apiKey);
            localStorage.setItem("userEmail", email);
            setApiKey(apiKey);
            setUserEmail(email);
            location.reload();
          } catch (e) {
            location.reload();
          }
        } else {
          toast.error("Invalid email");
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      }

      if (apiKey) {
        // ... Xử lý giống như trong componentDidMount
        const email = localStorage.getItem("userEmail");
        setIsLoading(true);
        toast.success(`Chào mừng bạn ${email.slice(0, email.indexOf("@"))}`);
        const { data } = await getListTodo();
        const todos = data?.data?.listTodo;
        setTodos(todos);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiKey, userEmail]);

  const addTodo = async (newTodo) => {
    try {
      setIsLoading(true);
      const { data } = await addTodoApi(newTodo);
      if (data.code === 401) {
        throw new Error("Lỗi");
      }
      toast.success("Thêm todo thành công!");
      const todo = data?.data;
      setTodos([todo, ...todos]);
      setIsLoading(false);
    } catch (e) {
      toast.error("Đã có lỗi xảy ra.");
      location.reload();
    }
  };

  const deleteTodo = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await deleteTodoApi(id);
      if (data.code === 401) {
        throw new Error("Lỗi");
      }
      toast.success("Xóa todo thành công!");

      setTodos(todos.filter((todo) => todo._id !== id));
      setIsLoading(false);
    } catch (e) {
      toast.error("Đã có lỗi xảy ra.");
      location.reload();
    }
  };

  const editTodo = async (todo) => {
    try {
      setIsLoading(true);
      const { data } = await editTodoApi(todo);
      if (data.code === 401) {
        throw new Error("Lỗi");
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
      toast.error("Đã có lỗi xảy ra.");
      location.reload();
    }
  };

  const searchTodo = async (value) => {
    setIsLoading(true);
    const { data } = await searchTodoApi(value);
    setTodos(data.data.listTodo);
    setIsLoading(false);
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
