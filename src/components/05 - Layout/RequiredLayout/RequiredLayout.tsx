import { useContext, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function RequiredLayout() {
  const { setModalAuth } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  let isLoggedIn = false;

  useLayoutEffect(() => {
    if (!isLoggedIn) {
      setModalAuth(true);
      navigate(-1);
    }
  }, [isLoggedIn]);

  return <>{isLoggedIn && <Outlet />}</>;
}
