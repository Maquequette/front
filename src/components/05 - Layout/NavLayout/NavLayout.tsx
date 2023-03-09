import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/01 - Atoms/Loading/Loading";
import Header from "@/components/04 - Templates/Header/Header";

export default function NavLayout() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
}
