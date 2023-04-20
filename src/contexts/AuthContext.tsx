import useDisableScroll from "@/hooks/useDisableScroll";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

export interface IAuthContext {
    modalAuth: boolean,
    setModalAuth: Dispatch<SetStateAction<boolean>>,
    user: IUser,
    setUser: Dispatch<SetStateAction<IUser>>,
    isConnected: () => boolean
}

export interface IUser {
    id: Number;
    name: string;
    email: string;
}

export const AuthContext = createContext<IAuthContext>(null!);

export function AuthProvider({ children }: { children: JSX.Element }) {

    const { enable, disable } = useDisableScroll();
    const [modalAuth, setModalAuth] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>(null!);

    useEffect(() => {
        modalAuth ? disable() : enable()
    }, [modalAuth])

    const isConnected = (): boolean => user !== null

    return (
        <AuthContext.Provider value={{
            modalAuth,
            setModalAuth,
            user,
            setUser,
            isConnected
        }}

        >
            {children}
        </AuthContext.Provider>
    )
}
