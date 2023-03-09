import { useTranslation } from "react-i18next";

export default function Home(): JSX.Element {
  const { t } = useTranslation();

  return (
    <h1 className="text-3xl font-bold underline">
      {
        t("Welcome to React")
      }
    </h1>
  );
}
