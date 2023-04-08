import { useTranslation } from "react-i18next";
import { Player } from "@lottiefiles/react-lottie-player";
import PageTransition from "@/components/04 - Templates/PageTransition/PageTransition";
import Hero from "@/components/04 - Templates/Hero/Hero";
import Container from "@/components/01 - Atoms/Container/Container";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import gwen from "../assets/images/gwen.json";

export default function Home(): JSX.Element {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <Container center={true} isLarge={true}>
        <Hero
          title={
            <Heading tag="h1" level="primary">
              LEARN
              <span className="block">FRONT-END / WEB DESIGN</span>
              <span className="strip">
                THE COOL WAY <Svg id="waves" preserveAspectRatio="none" />
              </span>
            </Heading>
          }
          illustation={<Player src={gwen} autoplay keepLastFrame />}
        />
      </Container>
    </PageTransition>
  );
}
