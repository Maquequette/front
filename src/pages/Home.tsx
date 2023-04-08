import { useTranslation } from "react-i18next";
import PageTransition from "@/components/04 - Templates/PageTransition/PageTransition";

export default function Home(): JSX.Element {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <h1>{t("Welcome")}</h1>
    </PageTransition>
  );
}
