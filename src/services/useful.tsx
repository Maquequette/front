import ax from "axios";
import { refreshToken } from "./auth.service";

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
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = await refreshToken({ token: localStorage.getItem("access_token")! });
      prevRequest.headers["Authorization"] = `Bearer ${newAccessToken.data.refresh_token}`;
      localStorage.setItem("refresh_token", newAccessToken.data.refresh_token);

      return axios(prevRequest);
    }
    return Promise.reject(error);
  }
);
