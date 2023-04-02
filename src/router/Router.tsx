import { Routes, Route, useLocation } from "react-router-dom";
import { lazy } from "react";
import NavLayout from "@/components/05 - Layout/NavLayout/NavLayout";
import RequiredLayout from "@/components/05 - Layout/RequiredLayout/RequiredLayout";

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

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<NavLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route element={<RequiredLayout />}>
          <Route path="/classRoom" element={<ClassRoom />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/dev" element={<DesignSystem />} />
    </Routes>
  );
}
