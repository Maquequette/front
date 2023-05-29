import { memo } from "react";
import { useTranslation } from "react-i18next";

export default memo(function Date({ date }: { date: number | Date }) {
  const { t } = useTranslation();
  return (
    <span className="date">
      {t("intlDateTime", {
        val: date,
        interpolation: { escapeValue: false }
      })}
    </span>
  );
});
