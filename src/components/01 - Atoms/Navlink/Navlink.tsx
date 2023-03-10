import { NavLink as BaseNavLink } from "react-router-dom";
import { StyleTypes } from "@/types/StyleTypes";
import { ReactNode } from "react";
import "./Navlink.scss";
import { Theme } from "@/types/Theme";

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
        (isActive ? "active" : "") +
        ` ${icon ? "link--icon" : ""} link link--${theme} ${classes ?? ""}`
      }>
      {children}
    </BaseNavLink>
  );
}
