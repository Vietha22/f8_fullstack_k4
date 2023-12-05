import { config } from "./config.ts";
import { Data } from "../types";
const { SERVER_API } = config;

export const client = {
  serverApi: SERVER_API,
  apiKey: localStorage.getItem("apiKey"),
  setApiKey: function (apiKey: string) {
    this.apiKey = apiKey;
  },
  send: async function (url: string, method = "GET", body: Data | null) {
    url = `${this.serverApi}${url}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (this.apiKey) {
      headers["X-Api-Key"] = `${this.apiKey}`;
    }
    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    const data = await response.json();

    if (data.code === 401) {
      localStorage.clear();
    }

    return { response, data };
  },

  //http get
  get: function (url: string, body: null) {
    return this.send(url, "GET", body);
  },
  //http post
  post: function (url: string, body: Data) {
    return this.send(url, "POST", body);
  },
  //http put
  put: function (url: string, body: Data) {
    return this.send(url, "PUT", body);
  },
  //http patch
  patch: function (url: string, body: Data) {
    return this.send(url, "PATCH", body);
  },
  //http delete
  delete: function (url: string, body: null) {
    return this.send(url, "DELETE", body);
  },
};
