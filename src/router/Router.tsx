import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import NavLayout from "@/components/05 - Layout/NavLayout/NavLayout";

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
        <Route index element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/classRoom" element={<ClassRoom />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/dev" element={<DesignSystem />} />
    </Routes>
  );
}
