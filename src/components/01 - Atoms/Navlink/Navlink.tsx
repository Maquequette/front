import { type MouseEventHandler, type ReactNode, memo } from "react";
import { NavLink as BaseNavLink } from "react-router-dom";
import { type Theme } from "@/types/Theme";
import "./Navlink.scss";

export interface INavlink {
  to: string;
  children: ReactNode;
  theme: Theme;
  classes?: string;
  id?: string;
  icon?: JSX.Element;
  badge?: JSX.Element;
  onclick?: MouseEventHandler<HTMLAnchorElement>;
}

export default memo(function Navlink({
  to,
  children,
  theme,
  classes = "",
  id,
  icon,
  badge,
  onclick = () => {}
}: INavlink) {
  return (
    <BaseNavLink
      to={to}
      id={id}
      className={({ isActive }) =>
        (isActive ? "active" : "") +
        ` link link--${theme} ${icon ? "link--icon" : ""} ${badge ? "link--badge" : ""} ${classes}`
      }
      onClick={onclick}>
      {icon}
      {badge}
      <div className="link__txt">{children}</div>
    </BaseNavLink>
  );
});
