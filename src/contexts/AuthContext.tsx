import Login from "@/components/03 - Organisms/Auth/Login";
import Register from "@/components/03 - Organisms/Auth/Register";
import Tabs from "@/components/03 - Organisms/Tabs/Tabs";
import Dialog from "@/components/04 - Templates/Dialog/Dialog";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { TabsProvider } from "./TabsContext";

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

    const [modalAuth, setModalAuth] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>(null!);

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
            {!isConnected() &&
                <Dialog
                    id="Auth"
                    visible={modalAuth}
                    Dismiss={() => {
                        setModalAuth(!modalAuth)
                    }}
                >

                    <TabsProvider>
                        <Tabs tabs={[
                            {
                                tabTitle: 'Login',
                                tabContent: <Login />
                            },
                            {
                                tabTitle: 'Register',
                                tabContent: <Register />
                            }
                        ]} />
                    </TabsProvider>

                </Dialog>
            }
        </AuthContext.Provider>
    )
}
