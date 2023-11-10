import React from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

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
    };
  }

  async componentDidMount() {
    if (!this.state.apiKey || !this.state.userEmail) {
      const email = prompt(
        "Please enter your email:",
        "halongviet22@gmail.com"
      );
      if (email) {
        const { data } = await authApi(email);

        const { apiKey } = data.data;
        localStorage.setItem("apiKey", apiKey);
        this.setState({ apiKey, userEmail: email });
        localStorage.setItem("userEmail", email);
        location.reload();
      }
    }
    if (this.state.apiKey) {
      const { data } = await getListTodo();
      const todos = data?.data?.listTodo;
      this.setState({ todos });
    }
  }

  addTodo = async (newTodo) => {
    const { data } = await addTodoApi(newTodo);
    const todo = data?.data;
    this.setState((prevState) => ({
      todos: [todo, ...prevState.todos],
    }));
  };

  toggleTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  deleteTodo = async (id) => {
    const data = await deleteTodoApi(id);
    console.log(data);
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo._id !== id),
    }));
  };

  editTodo = async (todoItem) => {
    await editTodoApi(todoItem);
    this.setState((prevState) => ({
      todos: prevState.todos.map((item) =>
        item._id === todoItem._id ? { ...item, todo: todoItem.todo } : item
      ),
    }));
  };

  render() {
    return (
      <main className="flex items-center justify-center p-8">
        <div className="container bg-slate-700 p-4 flex flex-col justify-center items-center">
          <h1 className="font-bold text-white">Welcome to TodoApp</h1>
          <AddTodo addTodo={this.addTodo} />
          <TodoList
            todos={this.state.todos}
            toggleTodo={this.toggleTodo}
            deleteTodo={this.deleteTodo}
            editTodo={this.editTodo}
          />
        </div>
      </main>
    );
  }
}

export default App;
