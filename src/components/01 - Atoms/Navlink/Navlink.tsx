import { ReactNode } from "react";
import { NavLink as BaseNavLink } from "react-router-dom";
import { StyleTypes } from "@/types/StyleTypes";
import { Theme } from "@/types/Theme";
import "./Navlink.scss";

export interface INavlink {
  to: string;
  children: ReactNode;
  theme: Theme;
  classes?: string;
  icon?: boolean;
}

export default function Navlink({ to, theme, children, classes, icon }: INavlink) {
  return (
    <BaseNavLink
      to={to}
      className={({ isActive }) =>
        (isActive ? "active" : "") + ` link link--${theme} ${classes ?? ""}`
      }>
      {children}
    </BaseNavLink>
  );
}
