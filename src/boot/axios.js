import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  //** DEVELOP **//
  // baseURL: "http://localhost:5000/api/v1",
  //** PRODUCTION **//
  baseURL: process.env.MY_API_REST,
  withCredentials: true,
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };