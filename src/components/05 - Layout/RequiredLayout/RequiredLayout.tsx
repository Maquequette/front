import { useContext, memo, useLayoutEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";

export default memo(function RequiredLayout() {
  const { setModalAuth, isConnected } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isConnected) {
      setModalAuth(true);
      navigate(-1);
    }
  }, [isConnected]);

  return <>{isConnected && <Outlet />}</>;
});
