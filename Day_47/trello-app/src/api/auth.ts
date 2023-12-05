import { client } from "../utils/client.ts";

export const authApi = (email: string) => {
  return client.get(`/api-key/?email=${email}`, null);
};
