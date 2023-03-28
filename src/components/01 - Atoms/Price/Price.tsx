import { Theme } from "@/types/Theme";
import { StyleTypes } from "@/types/StyleTypes";
import { useTranslation } from "react-i18next";

export interface IPrice {
  theme: Theme;
  value: number;
  type: StyleTypes;
}

export default function Price({ theme, value, type }: IPrice) {
    const {i18n} = useTranslation()
  return (
    <p className={`price price--${type}--${theme}`}>
      {new Intl.NumberFormat(i18n.language, { style: i18n.curr, currency: "EUR" }).format(value)}
    </p>
  );
}
