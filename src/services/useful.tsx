import ax from "axios";
import { refreshToken } from "./auth.service";

export const axios = ax.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Accept: "application/json"
  },
  withCredentials: true
});

export const request = ({ ...options }) => {
  if (localStorage.getItem("access_token")) {
    axios.defaults.headers.common.Authorization = localStorage.getItem("access_token");
  }

  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    if (error.code === 401 && localStorage.getItem("access_token")) {
      refreshToken({ token: localStorage.getItem("access_token")! });
    }
  };
  return axios(options).then(onSuccess).catch(onError);
};
