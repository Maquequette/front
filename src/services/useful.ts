import ax from "axios";
import { refreshToken } from "./auth.service";
let retry = false;

export const axios = ax.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Accept: "application/json"
  },
  withCredentials: true
});

axios.interceptors.request.use(
  (config) => {
    if (!config.headers["Authorization"] && localStorage.getItem("access_token")) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !retry) {
      retry = true;

      const newAccessToken = await refreshToken({ token: localStorage.getItem("access_token")! });
      error.config.headers["Authorization"] = `Bearer ${newAccessToken.data.refresh_token}`;
      localStorage.setItem("refresh_token", newAccessToken.data.refresh_token);

      return axios(originalRequest);
    }
    retry = false;
    return Promise.reject(error);
  }
);
