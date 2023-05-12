import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
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
  isConnected: () => boolean;
}

export interface IUser {
  id: Number;
  firstName: string;
  lastName: string;
  email: string;
  roles: Array<string>;
  active: boolean;
  firstConnection: boolean;
  token: string;
}

export const AuthContext = createContext<IAuthContext>(null!);

const AuthProvider = memo(function AuthProvider({ children }: { children: JSX.Element }) {
  const { enable, disable } = useDisableScroll();
  const [modalAuth, setModalAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>(null!);

  useEffect(() => {
    modalAuth ? disable() : enable();
  }, [modalAuth]);

  const isConnected = useCallback(() => {
    return user !== null;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        modalAuth,
        setModalAuth,
        user,
        setUser,
        isConnected
      }}>
      {children}
    </AuthContext.Provider>
  );
});

export { AuthProvider };
