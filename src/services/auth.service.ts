import { axios } from "./useful";

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const login = (data: ILogin) => {
  return axios.post("/auth/login", data);
};

export const register = (data: IRegister) => {
  return axios.post("/auth/register", data);
};

export const logout = () => {
  return axios.post("/auth/logout");
};

export const forgotPassword = (data: { email: string }) => {
  return axios.post("/auth/forgot-password", data);
};

export const refreshToken = (data: { token: string }) => {
  return axios.post("/auth/refresh", data);
};

export const profil = () => {
  return axios.get("/api/me");
};
