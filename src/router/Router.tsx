import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { lazy, useContext, useEffect } from "react";
import NavLayout from "@/components/05 - Layout/NavLayout/NavLayout";
import { AuthContext } from "@/contexts/AuthContext";

const Home = lazy(() => {
  return import("@/pages/Home");
});

const NoMatch = lazy(() => {
  return import("@/pages/NoMatch");
});

const DesignSystem = lazy(() => {
  return import("@/pages/DesignSystem");
});

const Challenges = lazy(() => {
  return import("@/pages/Challenges");
});

const Lessons = lazy(() => {
  return import("@/pages/Lessons");
});

const ClassRoom = lazy(() => {
  return import("@/pages/ClassRoom");
});

const RequiredAuth = ({ redirectPath = '/' }) => {

  const { setModalAuth } = useContext(AuthContext)
  let isLoggedIn = false

  if (!isLoggedIn) {

    useEffect(() => {
      setModalAuth(true)
    }, [])

    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default function Router(): JSX.Element {


  return (
    <Routes>
      <Route path="/" element={<NavLayout />}>
        <Route index element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="*" element={<NoMatch />} />

        <Route element={<RequiredAuth />}>
          <Route path="/classroom" element={<ClassRoom />} />
        </Route>

      </Route>
      <Route path="/dev" element={<DesignSystem />} />
    </Routes>
  );
}