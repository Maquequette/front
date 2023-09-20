import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemesContext } from "@/contexts/ThemesContext";
import "./Logo.scss";

export default memo(function Logo({ classes, name }: { classes?: string; name?: string }) {
  const { theme } = useContext(ThemesContext);

  return (
    <Link to="" className={`logo ${classes ?? ""}`}>
      {theme === "dark" ? (
        <img src="./mqq__logo--desktop--dark.png" alt="Logo" className="logo__img" />
      ) : (
        <img src="./mqq__logo--desktop.png" alt="Logo" className="logo__img" />
      )}

      {name && <h1 className="logo__txt">{name}</h1>}
    </Link>
  );
});
