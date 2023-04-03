import { AuthContext } from '@/contexts/AuthContext'
import { login } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useAuth() {

    const navigate = useNavigate()
    const { setModalAuth } = useContext(AuthContext)

    // Mutations
    const { mutate: onRegister } = useMutation({
        mutationFn: login,
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
