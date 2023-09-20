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

const Home = lazy(async () => await import("@/pages/Home/Home"));
const Challenges = lazy(async () => await import("@/pages/Challenges/Challenges"));
const Lessons = lazy(async () => await import("@/pages/Lessons/Lessons"));
const Classroom = lazy(async () => await import("@/pages/ClassRoom/ClassRoom"));
const Profil = lazy(async () => await import("@/pages/Profil/Profil"));
const NoMatch = lazy(async () => await import("@/pages/NoMatch/NoMatch"));
const Details = lazy(async () => await import("@/pages/Challenges/Details"));
const Cgu = lazy(async () => await import("@/pages/Cgu/Cgu"));
const DesignSystem = lazy(async () => await import("@/pages/DesignSystem"));

export default function Router(): JSX.Element {
  const { theme } = useContext(ThemesContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavLayout />} handle={{ crumb: ">" }}>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" handle={{ crumb: "challenges" }}>
          <Route index element={<Challenges />} />
          <Route path=":id" element={<Details />} />
        </Route>
        <Route path="/lessons">
          <Route index element={<Lessons />} handle={{ crumb: "lessons" }} />
          <Route path=":id" element={<Lessons />} handle={{ crumb: "lessons" }} />
        </Route>
        <Route path="/cgu">
          <Route index element={<Cgu />} handle={{ crumb: "Cgu" }} />
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
