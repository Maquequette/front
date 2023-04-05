import { axios } from "./useful"

const csrf = () => {
    return axios
        .get(`/sanctum/csrf-cookie`)
        .catch(error => {
            console.log(error)
        })
}

export interface ILogin {
    email: string
    password: string
}

export const login = async (data: ILogin) => {

    await csrf()
    axios
        .post('/login', data)
        .then(() => {
            console.log('ici')
        })
        .catch(error => {
            throw error
        })
}

export interface IRegister {
    name: string
    email: string
    password: string,
    password_confirmation: string
}

export const register = async (data: IRegister) => {

    await csrf()
    axios
        .post('/register', data)
        .catch(error => {
            console.log(error)
        })

}

export const logout = () => {

    axios
        .post('/logout')
        .catch(error => {
            throw error
        })
}

