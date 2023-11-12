import { client } from "../utils/client";

export const addTodoApi = (todo) => {
  return client.post("/todos", { todo });
};

export const getListTodo = () => {
  return client.get("/todos");
};

export const deleteTodoApi = (id) => {
  return client.delete(`/todos/${id}`);
};

export const editTodoApi = ({ _id, todo, isCompleted }) => {
  return client.patch(`/todos/${_id}`, {
    todo,
    isCompleted,
  });
};

export const searchTodoApi = (value) => {
  return client.get(`/todos?q=${value}`);
};
