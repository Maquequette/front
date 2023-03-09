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

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<NavLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
