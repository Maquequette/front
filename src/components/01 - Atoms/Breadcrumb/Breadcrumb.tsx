import { CSSProperties, Key, useMemo, memo } from "react";
import { NavLink, useMatches } from "react-router-dom";
import "./Breadcrumb.scss";

export default memo(function Breadcrumb({ style }: { style?: CSSProperties }) {
  const matches = useMatches();
  const crumbs = useMemo(
    () => matches.filter((match: any) => Boolean(match.handle?.crumb)),
    [matches]
  );

  return (
    <div className="breadcrumb" style={style}>
      {crumbs.map((match: any, index: Key) => (
        <NavLink key={index} to={match.pathname} className="breadcrumb__item">
          {match.handle.crumb}
        </NavLink>
      ))}
    </div>
  );
});
