import { useCallback } from "react";
import Svg from "../../01 - Atoms/Svg/Svg";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import Dropdown from "@/components/01 - Atoms/Dropdown/Dropdown";
import "./LanguageSwapper.scss";

export default function LanguageSwapper() {
  const { i18n } = useTranslation();

  const handleChangeLanguage = useCallback((lang: string) => {
    changeLanguage(lang);
  }, []);

  return (
    <Dropdown
      component={<Svg id="worldwide" />}
      options={[
        {
          isActive: i18n.language === "fr",
          component: <p>Français</p>,
          handleClick: handleChangeLanguage,
          value: "fr"
        },
        {
          isActive: i18n.language === "en",
          component: <p>Anglais</p>,
          handleClick: handleChangeLanguage,
          value: "en"
        }
      ]}
    />
  );
}
