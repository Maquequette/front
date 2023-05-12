import { Player } from "@lottiefiles/react-lottie-player";
import PageTransition from "@/components/04 - Templates/PageTransition/PageTransition";
import Hero from "@/components/04 - Templates/Hero/Hero";
import Container from "@/components/01 - Atoms/Container/Container";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import Stripe from "@/components/01 - Atoms/Stripe/Stripe";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import gwen from "../../assets/images/gwen.json";
import Learn from "@/components/01 - Atoms/Learn/Learn";
import Block from "@/components/01 - Atoms/Block/Block";
import Folder from "@/components/01 - Atoms/Folder/Folder";
import Grid from "@/components/02 - Molecules/Grid/Grid";
import Collapsible from "@/components/03 - Organisms/Collapsible/Collapsible";
import Paragraph from "@/components/01 - Atoms/Paragraph/Paragraph";
import Button from "@/components/01 - Atoms/Button/Button";
import Card from "@/components/03 - Organisms/Card/Card";
import "./Home.scss";

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
        <Folder down="dark" theme="dark">
          <Heading tag="h2" level="primary" color="light">
            HOW TO BEGIN PRACTICING ??
          </Heading>
          <Grid size="22.5rem">
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
          <div className="d-flex justify-end">
            <Button theme="success">
              <Svg id="arrow" />
              TRY IT NOW !
            </Button>
          </div>
          <Folder theme="primary" down="light">
            <Heading tag="h2" level="primary" color="dark">
              AND WE PROVIDE LESSONS TOO !!
            </Heading>
            <Grid size="33rem">
              {/* <Card
                tags={[
                  { label: "HTML", theme: "primary" },
                  { label: "CSS", theme: "secondary" },
                  { label: "JS", theme: "success" },
                  { label: "PHP", theme: "danger" },
                  { label: "JAVA", theme: "warn" },
                  { label: "HTML", theme: "primary" },
                  { label: "CSS", theme: "secondary" },
                  { label: "JS", theme: "success" },
                  { label: "PHP", theme: "danger" },
                  { label: "JAVA", theme: "warn" }
                ]}
                price={{ value: "10", currency: "EUR" }}
                author="John Doe Mino"
                date={Date.now()}
                title="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi nulla eos magnam harum sapiente aut laboriosam commodi"
                img="https://media.istockphoto.com/id/1199486942/fr/photo/dr%C3%B4le-merci-carte-baiser-avec-des-animaux.jpg?s=1024x1024&w=is&k=20&c=ew-DCfMHG9cs9qppUkJfc80bRUZ1x278THFeCTNpml4="
              />
              <Card
                tags={[
                  { label: "HTML", theme: "primary" },
                  { label: "CSS", theme: "secondary" },
                  { label: "JS", theme: "success" },
                  { label: "PHP", theme: "danger" },
                  { label: "JAVA", theme: "warn" },
                  { label: "HTML", theme: "primary" },
                  { label: "CSS", theme: "secondary" },
                  { label: "JS", theme: "success" },
                  { label: "PHP", theme: "danger" },
                  { label: "JAVA", theme: "warn" }
                ]}
                price={{ value: "10", currency: "EUR" }}
                author="John Doe Mino"
                date={Date.now()}
                title="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi nulla eos magnam harum sapiente aut laboriosam commodi"
                img="https://media.istockphoto.com/id/1199486942/fr/photo/dr%C3%B4le-merci-carte-baiser-avec-des-animaux.jpg?s=1024x1024&w=is&k=20&c=ew-DCfMHG9cs9qppUkJfc80bRUZ1x278THFeCTNpml4="
              />
              <Card
                tags={[
                  { label: "HTML", theme: "primary" },
                  { label: "CSS", theme: "secondary" },
                  { label: "JS", theme: "success" },
                  { label: "PHP", theme: "danger" },
                  { label: "JAVA", theme: "warn" },
                  { label: "HTML", theme: "primary" },
                  { label: "CSS", theme: "secondary" },
                  { label: "JS", theme: "success" },
                  { label: "PHP", theme: "danger" },
                  { label: "JAVA", theme: "warn" }
                ]}
                price={{ value: "10", currency: "EUR" }}
                author="John Doe Mino"
                date={Date.now()}
                title="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi nulla eos magnam harum sapiente aut laboriosam commodi"
                img="https://media.istockphoto.com/id/1199486942/fr/photo/dr%C3%B4le-merci-carte-baiser-avec-des-animaux.jpg?s=1024x1024&w=is&k=20&c=ew-DCfMHG9cs9qppUkJfc80bRUZ1x278THFeCTNpml4="
              /> */}
            </Grid>
            <div className="d-flex justify-end">
              <Button theme="dark">
                <Svg id="arrow" />
                TRY IT NOW !
              </Button>
            </div>
          </Folder>
        </Folder>
      </Container>
    </PageTransition>
  );
}
