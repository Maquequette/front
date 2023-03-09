import "./Logo.scss";
import { Link } from "react-router-dom";

export default function Logo({
  classes,
  name,
}: {
  classes?: String;
  name?: String;
}) {
  return (
    <Link to="/" className={`logo ${classes ?? ""}`}>
      <img src="./mqq__logo.svg" alt="Logo" className="logo__img" />
      {name && <h1 className="logo__txt">{name}</h1>}
    </Link>
  );
}
