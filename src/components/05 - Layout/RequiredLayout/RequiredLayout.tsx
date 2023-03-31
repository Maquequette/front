import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLastLocation } from "react-router-dom-last-location";
import { AuthContext } from "@/contexts/AuthContext";
import { Outlet } from "react-router-dom";

export default function RequiredLayout() {
  const { setModalAuth } = useContext(AuthContext);
  const lastlocation = useLastLocation();

  let isLoggedIn = false;

  useEffect(() => {
    console.log(lastlocation.lastLocation);
    if (!isLoggedIn) {
      setModalAuth(true);
    }
  }, [isLoggedIn]);

  return isLoggedIn ? <Outlet /> : <Navigate to={lastlocation.lastLocation?.pathname ?? ""} />;
}
