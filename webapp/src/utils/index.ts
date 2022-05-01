import axios from "axios";

const getHttpClient = axios.create({
  baseURL: "/api",
  timeout: 3000,
  headers: {},
});

export { getHttpClient };
