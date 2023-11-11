import React from "react";
import TodoList from "./components/TodoList/TodoList";
import AddTodo from "./components/AddTodo/AddTodo";
import Loader from "./components/Loader/Loader";

import "./App.css";
import {
  addTodoApi,
  deleteTodoApi,
  editTodoApi,
  getListTodo,
} from "./api/todo";
import { authApi } from "./api/auth";
import { client } from "./utils/client";

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
      if (email) {
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
      }
    }
    if (this.state.apiKey) {
      this.setState({ isLoading: true });
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
      const todo = data?.data;
      this.setState((prevState) => ({
        todos: [todo, ...prevState.todos],
        isLoading: false,
      }));
    } catch (e) {
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
      this.setState((prevState) => ({
        todos: prevState.todos.filter((todo) => todo._id !== id),
        isLoading: false,
      }));
    } catch (e) {
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
      this.setState((prevState) => ({
        todos: prevState.todos.map((item) =>
          item._id === todo._id
            ? { ...item, todo: todo.todo, isCompleted: todo.isCompleted }
            : item
        ),
        isLoading: false,
      }));
    } catch (e) {
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
      </main>
    );
  }
}

export default App;
