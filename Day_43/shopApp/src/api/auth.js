import { client } from "../utils/client";

export const authApi = (email) => {
  return client.get(`/api-key/?email=${email}`);
};
