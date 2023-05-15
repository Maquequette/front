import {
  Route,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import { lazy } from "react";
import NavLayout from "@/components/05 - Layout/NavLayout/NavLayout";
import RequiredLayout from "@/components/05 - Layout/RequiredLayout/RequiredLayout";

const Home = lazy(() => import("@/pages/Home/Home"));
const Challenges = lazy(() => import("@/pages/Challenges/Challenges"));
const Lessons = lazy(() => import("@/pages/Lessons/Lessons"));
const Classroom = lazy(() => import("@/pages/ClassRoom/ClassRoom"));
const NoMatch = lazy(() => import("@/pages/NoMatch/NoMatch"));
{
  /* DEV PATH @todelete */
}
const DesignSystem = lazy(() => import("@/pages/DesignSystem"));

export default function Router(): JSX.Element {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavLayout />} handle={{ crumb: ">" }}>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} handle={{ crumb: "challenges" }} />
        <Route path="/lessons" element={<Lessons />} handle={{ crumb: "lessons" }} />

        <Route element={<RequiredLayout />}>
          <Route path="/classroom" element={<Classroom />} handle={{ crumb: "classroom" }} />
        </Route>

        <Route path="*" element={<NoMatch />} />
        {/* DEV PATH @todelete */}
        <Route path="/dev" element={<DesignSystem />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
