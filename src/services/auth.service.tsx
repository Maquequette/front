import { axios } from "./useful"

const csrf = () => axios.get(`/sanctum/csrf-cookie`)

export interface ILogin {
    email: string,
    password: string
}

export const login = async (data: ILogin) => {
    try {

        await csrf()

        await axios
            .post('/login', data)
            .catch(error => {
                throw error
            })

    } catch (e) {
        console.log(e)
    }
}
