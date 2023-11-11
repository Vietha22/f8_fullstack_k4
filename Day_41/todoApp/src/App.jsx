import React from "react";
import TodoList from "./components/TodoList/TodoList";
import AddTodo from "./components/AddTodo/AddTodo";
import Loader from "./components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import {
  addTodoApi,
  deleteTodoApi,
  editTodoApi,
  getListTodo,
} from "./api/todo";
import { authApi } from "./api/auth";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      apiKey: localStorage.getItem("apiKey"),
      userEmail: localStorage.getItem("userEmail"),
      isLoading: false,
    };
  }

  async componentDidMount() {
    if (!this.state.apiKey || !this.state.userEmail) {
      const email = prompt(
        "Please enter your email:",
        "halongviet22@gmail.com"
      );
      const patternEmail = /^([\w\.-]{3,}@[\w\.-]{1,}\.[a-z]{2,})$/;
      if (patternEmail.test(email)) {
        try {
          this.setState({ isLoading: true });
          const { data } = await authApi(email);
          if (data.code === 401) {
            throw new Error("Lỗi");
          }
          const { apiKey } = data.data;
          localStorage.setItem("apiKey", apiKey);
          localStorage.setItem("userEmail", email);
          this.setState({ apiKey, userEmail: email });
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
    if (this.state.apiKey) {
      const email = localStorage.getItem("userEmail");
      this.setState({ isLoading: true });
      toast.success(`Chào mừng bạn ${email.slice(0, email.indexOf("@"))}`);
      const { data } = await getListTodo();
      const todos = data?.data?.listTodo;
      this.setState({ todos, isLoading: false });
    }
  }

  addTodo = async (newTodo) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await addTodoApi(newTodo);
      if (data.code === 401) {
        throw new Error("Lỗi");
      }
      toast.success("Thêm todo thành công!");
      const todo = data?.data;
      this.setState((prevState) => ({
        todos: [todo, ...prevState.todos],
        isLoading: false,
      }));
    } catch (e) {
      toast.error("Đã có lỗi xảy ra.");
      location.reload();
    }
  };

  toggleTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  deleteTodo = async (id) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await deleteTodoApi(id);
      if (data.code === 401) {
        throw new Error("Lỗi");
      }
      toast.success("Xóa todo thành công!");
      this.setState((prevState) => ({
        todos: prevState.todos.filter((todo) => todo._id !== id),
        isLoading: false,
      }));
    } catch (e) {
      toast.error("Đã có lỗi xảy ra.");
      location.reload();
    }
  };

  editTodo = async (todo) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await editTodoApi(todo);
      if (data.code === 401) {
        throw new Error("Lỗi");
      }
      toast.success("Update todo thành công!");
      this.setState((prevState) => ({
        todos: prevState.todos.map((item) =>
          item._id === todo._id
            ? { ...item, todo: todo.todo, isCompleted: todo.isCompleted }
            : item
        ),
        isLoading: false,
      }));
    } catch (e) {
      toast.error("Đã có lỗi xảy ra.");
      location.reload();
    }
  };

  render() {
    return (
      <main className="flex items-center justify-center p-8">
        <div className="container bg-slate-700 p-4 flex flex-col justify-center items-center">
          <h1 className="font-bold text-white">Welcome to TodoApp!</h1>
          <AddTodo addTodo={this.addTodo} />
          <TodoList
            todos={this.state.todos}
            toggleTodo={this.toggleTodo}
            deleteTodo={this.deleteTodo}
            editTodo={this.editTodo}
          />
        </div>
        {this.state.isLoading && <Loader />}
        <ToastContainer />
      </main>
    );
  }
}

export default App;
