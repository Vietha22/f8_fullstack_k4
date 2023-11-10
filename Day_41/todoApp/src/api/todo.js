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

export const editTodoApi = (todo) => {
  const { _id, todo: todoText, isCompleted } = todo;
  return client.patch(`/todos/${_id}`, {
    todo: todoText,
    isCompleted,
  });
};
