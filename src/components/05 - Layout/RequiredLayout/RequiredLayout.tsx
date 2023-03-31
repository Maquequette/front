import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function RequiredLayout({ redirectPath = "/" }) {
  const { setModalAuth } = useContext(AuthContext);
  const location = useLocation();
  let isLoggedIn = false;

  useEffect(() => {
    if (!isLoggedIn) {
      setModalAuth(true);
    }
  }, [isLoggedIn]);

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectPath} replace />;
}
