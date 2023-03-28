import { ReactNode } from "react";
import { Theme } from "@/types/Theme";
import "./Badge.scss";

export default function Badge({ children, theme }: { children: ReactNode; theme: Theme }) {
  return <div className={`badge badge--${theme}`}>{children}</div>;
}
