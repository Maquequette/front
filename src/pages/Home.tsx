import { useTranslation } from "react-i18next";
import PageTransition from "@/components/04 - Templates/PageTransition/PageTransition";
import Hero from "@/components/04 - Templates/Hero/Hero";
import Container from "@/components/01 - Atoms/Container/Container";
export default function Home(): JSX.Element {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <Container center={true}>
        <Hero />
      </Container>
    </PageTransition>
  );
}
