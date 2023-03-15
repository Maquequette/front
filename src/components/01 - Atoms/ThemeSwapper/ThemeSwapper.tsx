import { useContext } from "react";
import { ThemesContext } from "@/contexts/ThemesContext";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import "./ThemeSwapper.scss";

export default function ThemeSwapper() {
  const { theme } = useContext(ThemesContext);

  return (
    <div className="themeSwapper">
      <Svg id="night" />
      <div className="themeSwapper__submenu"></div>
    </div>
  );
}
