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
import Folder from "@/components/01 - Atoms/Folder/Folder";
import Grid from "@/components/02 - Molecules/Grid/Grid";
import Collapsible from "@/components/03 - Organisms/Collapsible/Collapsible";
import Paragraph from "@/components/01 - Atoms/Paragraph/Paragraph";

export default function Home(): JSX.Element {
  return (
    <PageTransition>
      <Container center={true} isLarge={true}>
        <Hero
          styles={{ zIndex: 1, position: "relative" }}
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
        <Folder theme="dark" styles={{ marginTop: "-12rem", position: "relative" }}>
          <Heading tag="h2" level="primary" color="light" styles={{ padding: "0 6rem" }}>
            HOW TO BEGIN PRACTICING ??
          </Heading>
          <Grid size="22.5rem" styles={{ padding: "0 6rem" }}>
            <Collapsible theme="primary">
              <Svg id="coding" />
              <Heading tag="h4" level="secondary">
                CODE THE SKETCH
              </Heading>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt.
              </Paragraph>
            </Collapsible>
            <Collapsible theme="primary">
              <Svg id="coding" />
              <Heading tag="h4" level="secondary">
                CODE THE SKETCH
              </Heading>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt.
              </Paragraph>
            </Collapsible>
            <Collapsible theme="primary">
              <Svg id="coding" />
              <Heading tag="h4" level="secondary">
                CODE THE SKETCH
              </Heading>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt.
              </Paragraph>
            </Collapsible>
            <Collapsible theme="primary">
              <Svg id="coding" />
              <Heading tag="h4" level="secondary">
                CODE THE SKETCH
              </Heading>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt.
              </Paragraph>
            </Collapsible>
          </Grid>
          {/* <Folder theme="primary"></Folder> */}
        </Folder>
      </Container>
    </PageTransition>
  );
}
