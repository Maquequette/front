import { AuthContext } from '@/contexts/AuthContext'
import { login, register } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useAuth() {

    const navigate = useNavigate()
    const { setModalAuth, setUser } = useContext(AuthContext)

    // Mutations
    const { mutate: onRegister } = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            console.log(data)
            setModalAuth(false)
        }
    })

    const { mutate: onLogin } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            setModalAuth(false)
            navigate(1)
        }
    })

    const { mutate: onLogout } = useMutation({
        mutationFn: login,
    })

    return {
        onRegister,
        onLogin,
        onLogout,
    }
}
