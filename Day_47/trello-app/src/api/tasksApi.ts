import { client } from "../utils/client.ts";
import { Data } from "../types";

export const getTasksApi = () => {
  return client.get("/tasks", null);
};

export const postTasksApi = (data: Data) => {
  return client.post(`/tasks`, data);
};
