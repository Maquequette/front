import { axios } from "./useful"

export interface ILogin {
    email: string
    password: string
}

export interface IRegister {
    name: string
    email: string
    password: string,
    password_confirmation: string
}

const csrf = () => {
    return axios.get(`/sanctum/csrf-cookie`)
}

export const login = async (data: ILogin) => {
    await csrf()
    return axios.post('/login', data)
}

export const register = async (data: IRegister) => {
    await csrf()
    return axios.post('/register', data)
}

export const logout = async () => {
    return axios.post('/logout')
}

export const forgotPassword = async (data: { email: string }) => {
    return axios.post('/forgot-password', data)
}

