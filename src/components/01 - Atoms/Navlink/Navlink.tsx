import { ReactNode, memo } from "react";
import { NavLink as BaseNavLink } from "react-router-dom";
import { Theme } from "@/types/Theme";
import "./Navlink.scss";

export interface INavlink {
  to: string;
  children: ReactNode;
  theme: Theme;
  classes?: string;
  id?: string;
  icon?: JSX.Element;
  badge?: JSX.Element;
}

export default memo(function Navlink({
  to,
  children,
  theme,
  classes = "",
  id,
  icon,
  badge
}: INavlink) {
  return (
    <BaseNavLink
      to={to}
      id={id}
      className={({ isActive }) =>
        (isActive && "active") +
        ` link link--${theme} ${icon ? "link--icon" : ""} ${badge ? "link--badge" : ""} ${classes}`
      }>
      {icon}
      {badge}
      <div className="link__txt">{children}</div>
    </BaseNavLink>
  );
});
