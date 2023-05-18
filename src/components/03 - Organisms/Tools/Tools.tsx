import { memo } from "react";
import ThemeSwapper from "@/components/01 - Atoms/ThemeSwapper/ThemeSwapper";
import LanguageSwapper from "@/components/01 - Atoms/LanguageSwapper/LanguageSwapper";
import "./Tools.scss";

export default memo(function Tools() {
  return (
    <ul className="tools">
      <li className="tools__item">
        <ThemeSwapper />
      </li>
      <li className="tools__item">
        <LanguageSwapper />
      </li>
    </ul>
  );
});
