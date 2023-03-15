import { useTranslation } from "react-i18next";
import PageTransition from "@/components/04 - Templates/PageTransition/PageTransition";

export default function Home(): JSX.Element {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <h1 className="text-3xl font-bold underline">{t("Welcome to React")}</h1>
    </PageTransition>
  );
}
