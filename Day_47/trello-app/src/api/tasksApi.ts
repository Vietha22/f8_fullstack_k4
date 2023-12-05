import { client } from "../utils/client.ts";

export const getTasksApi = () => {
  return client.get("/tasks");
};

export const postTasksApi = (data: object) => {
  return client.post(`/tasks`, data);
};
