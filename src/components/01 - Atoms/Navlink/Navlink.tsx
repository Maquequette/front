import { NavLink as BaseNavLink } from "react-router-dom";
import { Theme } from "@/types/Theme";
import "./Navlink.scss";
import { MouseEventHandler, ReactNode } from "react";
import Badge from "../Badge/Badge";

export interface INavlink {
  to: string;
  children: ReactNode;
  theme: Theme;
  classes?: string;
  icon?: JSX.Element;
  badge?: JSX.Element;
  clickCallback?: MouseEventHandler<HTMLAnchorElement>;
}

export default function Navlink({
  to,
  theme,
  children,
  icon,
  badge,
  clickCallback = () => { },
}: INavlink) {

  return (
    <BaseNavLink
      to={to}
      className={({ isActive }) =>
        (isActive ? "active" : "") +
        ` link link--${theme} ${icon ? "link--icon" : ""}  ${badge ? "link--badge" : ""}`
      }
      onClick={clickCallback}>
      {icon}
      {badge}
      <div className="link__txt">{children}</div>
    </BaseNavLink>
  );
}
