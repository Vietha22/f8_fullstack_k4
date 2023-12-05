import { client } from "../utils/client.ts";

export const authApi = (email) => {
  return client.get(`/api-key/?email=${email}`);
};
