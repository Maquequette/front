import { useTranslation } from "react-i18next";

export default function Date({ date }: { date: number }) {
  const { t } = useTranslation();
  return (
    <span className="date">
      {t("intlDateTime", {
        val: date,
        interpolation: { escapeValue: false }
      })}
    </span>
  );
}
