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
    return axios
        .get(`/sanctum/csrf-cookie`)
        .catch(error => {
            console.log(error)
        })
}

export const login = async (data: ILogin) => {

    await csrf()
    return axios
        .post('/login', data)
        .catch(error => {
            throw error
        })
}

export const register = async (data: IRegister) => {

    await csrf()
    return axios
        .post('/register', data)
        .catch(error => {
            console.log(error)
        })

}

export const logout = async () => {

    return axios
        .post('/logout')
        .catch(error => {
            console.log(error)
        })
}

