import ax from "axios";
import { refreshToken } from "./auth.service";

export const axios = ax.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Accept: "application/json"
  },
  withCredentials: true
});

// export const request = ({ ...options }) => {
//   if (localStorage.getItem("access_token")) {
//     axios.defaults.headers.common.Authorization = localStorage.getItem("access_token");
//   }

//   const onSuccess = (response: any) => response;
//   const onError = (error: any) => {
//     if (error.code === 401 && error.message === "Invalid credentials.") {
//       refreshToken({ token: localStorage.getItem("access_token")! });
//     }
//   };
//   return axios(options).then(onSuccess).catch(onError);
// };

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
      prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axios(prevRequest);
    }
    return Promise.reject(error);
  }
);
