import { useContext, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function RequiredLayout() {
  const { setModalAuth, isConnected } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isConnected()) {
      setModalAuth(true);
      navigate(-1);
    }
  }, [isConnected()]);

  return <>{isConnected() && <Outlet />}</>;
}
