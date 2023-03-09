import { NavLink as BaseNavLink } from "react-router-dom";
import { Theme } from "@/types/Navlink/Theme";
import "./Navlink.scss";
import { ReactNode } from "react";

export default function Navlink({
  to,
  theme,
  children,
}: {
  to: string;
  theme: Theme;
  children: ReactNode;
}) {
  return (
    <BaseNavLink
      to={to}
      className={({ isActive }) =>
        (isActive ? "active" : "") + `link link--${theme}`
      }
    >
      {children}
    </BaseNavLink>
  );
}
