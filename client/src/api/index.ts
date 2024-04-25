import axios from "axios";
import { toast } from "react-toastify";
import { SignInType, SignUpType } from "../types";

const URL = import.meta.env.PROD ? "/api/v1" : "http://localhost:3000/api/v1";

const API = axios.create({ baseURL: URL });

API.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token") || "";

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response) {
    console.log(response);
    if (!response.data.error) {
      return response.data;
    } else {
      console.log(response.data.msg);
      toast.error(response.data.msg);
      return Promise.reject(response.data);
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error instanceof Error) {
      console.log(error.message);
    } else console.log(error);

    if (error.response) {
      toast.error(error.response.data?.msg);
    } else {
      toast.error("Network Error: Please try again later.", {
        toastId: "Network Error",
      });
    }
    return Promise.reject(error);
  }
);

/* Auth API */
export const login = (signInData: SignInType) =>
  API.post("/auth/login", signInData);
export const register = (signUpData: SignUpType) =>
  API.post("/auth/register", signUpData);
// export const logout = () => API.get("/auth/logout");
// export const checkAuth = () => API.get("/auth/check");

/* Dashboard API */
export const getDashboard = () => API.get("/url/all");
