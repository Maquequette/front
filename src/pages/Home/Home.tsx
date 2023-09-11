import { Player } from "@lottiefiles/react-lottie-player";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
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
import { getChallenges } from "@/services/challenges.service";
import DotLoader from "@/components/01 - Atoms/DotLoader/DotLoader";
import "./Home.scss";

export default function Home(): JSX.Element {
  const { t } = useTranslation();
  const { data: challenges, isLoading } = useQuery(["challenges"], () =>
    getChallenges({ pageParam: 1, itemsPerPage: 3 })
  );

  return (
    <PageTransition>
      <Container center={true} isLarge={true}>
        <Hero
          styles={{ zIndex: 1, position: "relative" }}
          title={
            <Heading tag="h1" level="primary">
              <Learn hasGlass={true}>{t("LEARN")}</Learn>
              <Block>{t("FRONT-END / WEB DESIGN")}</Block>
              <Stripe theme="secondary">
                {t("THE COOL WAY")}
                <Svg id="waves" />
              </Stripe>
            </Heading>
          }
          illustation={<Player src={gwen} autoplay keepLastFrame />}
        />
        <Folder down="dark" theme="dark">
          <Heading tag="h2" level="primary" color="light">
            {t("HOW TO BEGIN PRACTICING ??")}
          </Heading>
          <Grid size="22.5rem">
            <Collapsible theme="primary">
              <Svg id="coding" />
              <Heading tag="h4" level="secondary">
                {t("CODE THE SKETCH")}
              </Heading>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt.
              </Paragraph>
            </Collapsible>
            <Collapsible theme="primary">
              <Svg id="coding" />
              <Heading tag="h4" level="secondary">
                {t("CODE THE SKETCH")}
              </Heading>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt.
              </Paragraph>
            </Collapsible>
            <Collapsible theme="primary">
              <Svg id="coding" />
              <Heading tag="h4" level="secondary">
                {t("CODE THE SKETCH")}
              </Heading>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt.
              </Paragraph>
            </Collapsible>
            <Collapsible theme="primary">
              <Svg id="coding" />
              <Heading tag="h4" level="secondary">
                {t("CODE THE SKETCH")}
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
              {t("TRY IT NOW !")}
            </Button>
          </div>
          <Folder theme="primary" down="light">
            <Heading tag="h2" level="primary" color="dark">
              {t("AND WE PROVIDE LESSONS TOO !!")}
            </Heading>
            <Grid size="33rem">
              {!isLoading && <DotLoader theme="secondary" />}
              {challenges?.data?.["hydra:member"].map((challenge: any) => {
                return (
                  <Card
                    img={challenge?.resources[0]?.value}
                    key={challenge.id}
                    badge={challenge.difficulty}
                    tags={challenge.tags}
                    id={challenge.id}
                    isLiked={challenge.isLiked}
                    path={`/challenges/${challenge.id}`}
                    date={new Date(challenge.updatedAt ?? challenge.createdAt)}
                    title={challenge.title}
                    desc={challenge.description}
                    author={`${challenge.author.firstName} ${challenge.author.lastName}`}
                  />
                );
              })}
            </Grid>
            <div className="d-flex justify-end">
              <Button theme="dark">
                <Svg id="arrow" />
                {t("TRY IT NOW !")}
              </Button>
            </div>
          </Folder>
        </Folder>
      </Container>
    </PageTransition>
  );
}
