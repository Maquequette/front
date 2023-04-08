import { AuthContext } from '@/contexts/AuthContext'
import { login, register, logout, forgotPassword } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useToasts from './useToasts'

export default function useAuth() {

    const navigate = useNavigate()
    const { pushToast } = useToasts()
    const { setModalAuth, setUser } = useContext(AuthContext)

    // Mutations
    const { mutate: onRegister } = useMutation({
        mutationFn: register,
        onSuccess: (response) => {
            setUser(response?.data)
            setModalAuth(false)
        }
    })

    const { mutate: onLogin } = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            setUser(response?.data)
            setModalAuth(false)
            navigate(1)
        }
    })

    const { mutate: onLogout } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            setUser(null!)
            navigate('/')
        }
    })

    const { mutate: onForgotPassword } = useMutation({
        mutationFn: forgotPassword,
        onSuccess: () => {
            pushToast({
                title: 'You forgot your password !',
                desc: 'Don\t worry, an email has been sent to help you reset your password',
                theme: 'secondary'
            })
        }
    })

    return {
        onRegister,
        onLogin,
        onLogout,
        onForgotPassword
    }
}
