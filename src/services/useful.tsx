import ax from "axios"

export const axios = ax.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})