import ThemeSwapper from "@/components/01 - Atoms/ThemeSwapper/ThemeSwapper";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import "./Tools.scss";

export default function Tools() {
  return (
    <ul className="tools">
      <li className="tools__item">
        <ThemeSwapper />
      </li>
      <li className="tools__item">
        <ThemeSwapper />
      </li>
    </ul>
  );
}
