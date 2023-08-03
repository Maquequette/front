import { AuthContext } from "@/contexts/AuthContext";
import { login, register, logout, profil } from "@/services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useToasts from "./useToasts";
import { data } from "autoprefixer";

export default function useAuth() {
  const navigate = useNavigate();
  const { pushToast } = useToasts();
  const { setModalAuth, setUser, user, isConnected } = useContext(AuthContext);

  // Mutations
  const { mutate: onRegister } = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("access_token", response.data.token);
      setUser({ ...user, token: response.data.token });
      setModalAuth(false);
    }
  });

  useQuery(["profil"], {
    queryFn: profil,
    enabled: isConnected(),
    onSuccess: (res) => {
      setUser((prev) => ({ ...prev, ...res.data }));
      localStorage.setItem("user", JSON.stringify(res.data));
    }
  });

  const { mutate: onLogin } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setUser({ ...user, token: response.data.token });
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("access_token", response.data.token);
      setModalAuth(false);
      navigate(1);
    }
  });

  const { mutate: onLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(null!);
      localStorage.clear();
      navigate("/");
    }
  });

  //   const { mutate: onForgotPassword } = useMutation({
  //     mutationFn: forgotPassword,
  //     onSuccess: () => {
  //       pushToast({
  //         title: "You forgot your password !",
  //         desc: "Don\t worry, an email has been sent to help you reset your password",
  //         theme: "secondary"
  //       });
  //     }
  //   });

  return {
    onRegister,
    onLogin,
    onLogout
    //onForgotPassword
  };
}
