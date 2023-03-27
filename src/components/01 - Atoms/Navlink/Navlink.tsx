import { NavLink as BaseNavLink } from "react-router-dom";
import { Theme } from "@/types/Theme";
import "./Navlink.scss";
import { ReactNode } from "react";

export interface INavlink {
  to: string;
  children: ReactNode;
  theme: Theme;
  classes?: string;
  icon?: JSX.Element;
}

export default function Navlink({ to, theme, children, classes, icon }: INavlink) {
  const Icon = icon;
  return (
    <BaseNavLink
      to={to}
      className={({ isActive }) =>
        (isActive ? "active" : "") +
        ` link link--${theme} ${icon ? "link--icon" : ""} ${classes ?? ""}`
      }>
      {icon && Icon}
      <div className="link__txt">{children}</div>
    </BaseNavLink>
  );
}
