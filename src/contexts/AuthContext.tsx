import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  memo
} from "react";
import useDisableScroll from "@/hooks/useDisableScroll";

export interface IAuthContext {
  modalAuth: boolean;
  setModalAuth: Dispatch<SetStateAction<boolean>>;
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  isConnected: boolean;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: Array<string>;
  active: boolean;
  firstConnection: boolean;
  token: string;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<IAuthContext>(null!);

const AuthProvider = memo(function AuthProvider({ children }: { children: JSX.Element }) {
  const { enable, disable } = useDisableScroll();
  const [modalAuth, setModalAuth] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [user, setUser] = useState<IUser>(null!);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    modalAuth ? disable() : enable();
  }, [modalAuth]);

  return (
    <AuthContext.Provider
      value={{
        modalAuth,
        setModalAuth,
        user,
        setUser,
        isConnected,
        setIsConnected
      }}>
      {children}
    </AuthContext.Provider>
  );
});

export { AuthProvider };
