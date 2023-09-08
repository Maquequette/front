import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import { lazy, useContext } from "react";
import NavLayout from "@/components/05 - Layout/NavLayout/NavLayout";
import RequiredLayout from "@/components/05 - Layout/RequiredLayout/RequiredLayout";
import { ThemesContext } from "@/contexts/ThemesContext";

const Home = lazy(() => import("@/pages/Home/Home"));
const Challenges = lazy(() => import("@/pages/Challenges/Challenges"));
const Lessons = lazy(() => import("@/pages/Lessons/Lessons"));
const Classroom = lazy(() => import("@/pages/ClassRoom/ClassRoom"));
const Profil = lazy(() => import("@/pages/Profil/Profil"));
const NoMatch = lazy(() => import("@/pages/NoMatch/NoMatch"));
const Detail = lazy(() => import("@/pages/Detail/Detail"));

{
  /* DEV PATH @todelete */
}
const DesignSystem = lazy(() => import("@/pages/DesignSystem"));

export default function Router(): JSX.Element {
  const { theme } = useContext(ThemesContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavLayout />} handle={{ crumb: ">" }}>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" handle={{ crumb: "challenges" }}>
          <Route index element={<Challenges />} />
          <Route path=":id" element={<Detail />} />
        </Route>
        <Route path="/lessons">
          <Route index element={<Lessons />} handle={{ crumb: "lessons" }} />
          <Route path=":id" element={<Lessons />} handle={{ crumb: "lessons" }} />
        </Route>
        <Route element={<RequiredLayout />}>
          <Route path="/classroom">
            <Route index element={<Classroom />} handle={{ crumb: "classroom" }} />
            <Route path=":id" element={<Classroom />} handle={{ crumb: "classroom" }} />
          </Route>
          <Route path="/profil">
            <Route index element={<Profil />} handle={{ crumb: "profil" }} />
          </Route>
        </Route>
        <Route path="*" element={<NoMatch />} />
        {/* DEV PATH @todelete */}
        <Route path="/dev" element={<DesignSystem />} />
      </Route>
    )
  );

  return (
    <div data-theme={theme} className="app">
      <RouterProvider router={router} />
    </div>
  );
}
