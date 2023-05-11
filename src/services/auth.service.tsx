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

export const login = async (data: ILogin) => {
  return axios.post("/auth/login", data);
};

export const register = async (data: IRegister) => {
  return axios.post("/auth/register", data);
};

export const logout = async () => {
  return axios.post("/auth/logout");
};

export const forgotPassword = async (data: { email: string }) => {
  return axios.post("/auth/forgot-password", data);
};

export const refreshToken = async (data: { token: string }) => {
  return axios.post("/auth/refresh", data);
};

export const profil = async () => {
  return axios.get("/api/user/me");
};
