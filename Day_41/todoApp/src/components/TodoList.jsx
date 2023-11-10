import React from "react";
import TodoItem from "./TodoItem";

class TodoList extends React.Component {
  render() {
    const { todos, toggleTodo, deleteTodo, editTodo } = this.props;
    return (
      <ul className="list-disc w-full max-w-3xl flex flex-col gap-4">
        {todos.length > 0 &&
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        {!todos ||
          (todos.length === 0 && (
            <li className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
              Khong co todo
            </li>
          ))}
      </ul>
    );
  }
}

export default TodoList;
