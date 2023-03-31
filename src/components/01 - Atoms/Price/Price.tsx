import { Theme } from "@/types/Theme";
import { StyleTypes } from "@/types/StyleTypes";
import { useTranslation } from "react-i18next";
import "./Price.scss";

export interface IPrice {
  theme: Theme;
  type: StyleTypes;
  value: PaymentCurrencyAmount;
}

export default function Price({ theme, value, type }: IPrice) {
  const { t } = useTranslation();
  return (
    <p className={`price price--${type}--${theme}`}>
      {t("intlCurrency", {
        price: value.value,
        currency: value.currency,
        currencyDisplay: "symbol"
      })}
    </p>
  );
}