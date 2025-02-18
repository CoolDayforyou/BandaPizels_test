import { getToken, removeToken } from "@/utils/storage";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://192.168.0.110:3000/api/v1";

export const authRoute = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const protectedRoute = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

protectedRoute.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

protectedRoute.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await removeToken();
    }

    return Promise.reject(error);
  },
);
