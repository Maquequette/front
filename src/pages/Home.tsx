import { Player } from "@lottiefiles/react-lottie-player";
import PageTransition from "@/components/04 - Templates/PageTransition/PageTransition";
import Hero from "@/components/04 - Templates/Hero/Hero";
import Container from "@/components/01 - Atoms/Container/Container";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import Stripe from "@/components/01 - Atoms/Stripe/Stripe";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import gwen from "../assets/images/gwen.json";
import Learn from "@/components/01 - Atoms/Learn/Learn";
import Block from "@/components/01 - Atoms/Block/Block";

export default function Home(): JSX.Element {
  return (
    <PageTransition>
      <Container center={true} isLarge={true}>
        <Hero
          title={
            <Heading tag="h1" level="primary">
              <Learn>LEARN</Learn>
              <Block>FRONT-END / WEB DESIGN</Block>
              <Stripe theme="secondary">
                THE COOL WAY <Svg id="waves" />
              </Stripe>
            </Heading>
          }
          illustation={<Player src={gwen} autoplay keepLastFrame />}
        />
      </Container>
    </PageTransition>
  );
}
