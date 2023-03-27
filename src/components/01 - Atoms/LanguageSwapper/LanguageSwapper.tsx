import { useCallback } from "react";
import Svg from "../Svg/Svg";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import "./LanguageSwapper.scss";

export default function LanguageSwapper() {
  const { i18n } = useTranslation();

  const handleChangeLanguage = useCallback((lang: string) => {
    changeLanguage(lang);
  }, []);

  return (
    <div className="language">
      <Svg id="worldwide" />
      <div className="language__options">
        <div
          className={`language__option ${i18n.language === "fr" ? "active" : ""}`}
          onClick={() => handleChangeLanguage("fr")}>
          <p className="language__txt">Français</p>
        </div>
        <div
          className={`language__option ${i18n.language === "en" ? "active" : ""}`}
          onClick={() => handleChangeLanguage("en")}>
          <p className="language__txt">Anglais</p>
        </div>
      </div>
    </div>
  );
}
