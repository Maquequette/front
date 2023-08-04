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

axios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !retry) {
      retry = true;

      const newAccessToken = await refreshToken({
        refresh_token: localStorage.getItem("refresh_token")!
      });

      console.log(newAccessToken);

      error.config.headers["Authorization"] = `Bearer ${newAccessToken.data.access_token}`;
      localStorage.setItem("access_token", newAccessToken.data.token);
      localStorage.setItem("refresh_token", newAccessToken.data.refresh_token);

      return axios(originalRequest);
    }
    retry = false;
    return Promise.reject(error);
  }
);
