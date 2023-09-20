import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { ThemesContext } from "@/contexts/ThemesContext";
import Filters from "@/components/02 - Molecules/Filters/Filters";
import PageTransition from "@/components/04 - Templates/PageTransition/PageTransition";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import ProfileButton from "@/components/01 - Atoms/ProfileButton/ProfileButton";
import Button from "@/components/01 - Atoms/Button/Button";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Tags from "@/components/02 - Molecules/Tags/Tags";
import Badge from "@/components/01 - Atoms/Badge/Badge";
import Container from "@/components/01 - Atoms/Container/Container";
import Sorts from "@/components/02 - Molecules/Sorts/Sorts";
import { dateToFormat } from "@/services/date";
import { BulletPoint } from "@/components/01 - Atoms/BulletPoint/BulletPoint";
import Like from "@/components/02 - Molecules/Like/Like";
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect";
import Block from "@/components/01 - Atoms/Block/Block";
import Wysiwyg from "@/components/01 - Atoms/Wysiwyg/Wysiwyg";
import { getCommentsFrom, postComment } from "@/services/comments.service";
import Comment from "@/components/02 - Molecules/Comment/Comment";
import Grid from "@/components/02 - Molecules/Grid/Grid";
import DotLoader from "@/components/01 - Atoms/DotLoader/DotLoader";
import Image from "@/components/01 - Atoms/Image/Image";
import Paragraph from "@/components/01 - Atoms/Paragraph/Paragraph";
import Tabs from "@/components/03 - Organisms/Tabs/Tabs";
import SolutionUpload from "@/components/03 - Organisms/Solution/SolutionUpload";
import SolutionCode from "@/components/03 - Organisms/Solution/SolutionCode";
import { TabsProvider } from "@/contexts/TabsContext";
import Label from "@/components/01 - Atoms/Label/Label";
import ChallengeSolutions from "./ChallengeSolutions";
import useToasts from "@/hooks/useToasts";
import { AuthContext } from "@/contexts/AuthContext";
import { getChallenge } from "@/services/challenges.service";
import { postSolution } from "@/services/solutions.service";

import "./Details.scss";

export default function ChallengeDetails() {
  const { t } = useTranslation();
  const { mainColor } = useContext(ThemesContext);
  const { id } = useParams();

  const { pushToast } = useToasts();
  const { isConnected } = useContext(AuthContext);

  const { data: challenge } = useQuery(
    ["challenge"],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    async () => await getChallenge({ id: parseInt(id!) })
  );
  const [comment, setComment] = useState<any>(null);
  const [displaySolution, setDisplaySolution] = useState<boolean>(false);
  const [displaySolutions, setDisplaySolutions] = useState<boolean>(false);
  const [pictures, setPictures] = useState<Array<any>>([]);
  const [files, setFiles] = useState<Array<any>>([]);
  const [links, setLinks] = useState<Array<any>>([]);

  const [querySolution, setQuerySolution] = useState<any>({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    challenge: parseInt(id!),
    visible: true,
    recap: "",
    resources: [],
    url: ""
  });

  useEffect(() => {
    setPictures(challenge?.data.resources.filter((resource: any) => resource.type === "image"));
    setFiles(challenge?.data.resources.filter((resource: any) => resource.type === "file"));
    setLinks(challenge?.data.resources.filter((resource: any) => resource.type === "url"));
  }, [challenge]);

  const loadRef = useRef(null);
  const isInView = useInView(loadRef);

  const [commentsQuery, setCommentsQuery] = useState({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    parent: parseInt(id!),
    order: undefined,
    orderBy: undefined
  });

  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ["comments", commentsQuery],
    keepPreviousData: true,
    queryFn: async ({ pageParam = 1 }) => await getCommentsFrom({ pageParam, ...commentsQuery }),
    getNextPageParam: (lastPage, pages) => {
      const urlParams = new URLSearchParams(lastPage.data["hydra:view"]?.["hydra:next"]);
      return urlParams.get("page") ?? null;
    }
  });

  useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage]);

  const handleComment = useCallback(() => {
    postComment({ content: comment, parent: challenge?.data["@id"] });
    setComment("");
    refetch({ refetchPage: (page, index, allPages) => true });
  }, [comment]);

  const handleSolution = useCallback(() => {
    const form = new FormData();

    // eslint-disable-next-line array-callback-return
    Object.entries(querySolution).map(([key, val]: any) => {
      if (key === "resources") {
        Array.from(val).forEach((element: any, index) => {
          form.append(`${key}[${index}][value]`, element.value);
          form.append(`${key}[${index}][type]`, element.type);
        });
      } else if (key === "url" && val) {
        form.append(`${key}[${querySolution.resources.length}][value]`, val);
        form.append(`${key}[${querySolution.resources.length}][type]`, "url");
        form.append(`${key}[${querySolution.resources.length}][label]`, "repository");
      } else {
        form.append(key, val);
      }
    });

    postSolution(form);
    setQuerySolution({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      challenge: parseInt(id!),
      visible: true,
      recap: "",
      resources: [],
      url: ""
    });
    setDisplaySolution(!displaySolution);
  }, [querySolution]);

  return (
    <PageTransition>
      <Filters theme={mainColor}>
        <div className="details__grid">
          <Heading tag="h1" level="secondary" styles={{ display: "flex", alignItems: "center" }}>
            {challenge?.data.title}
          </Heading>

          <ProfileButton
            id={challenge?.data.author.id}
            username={challenge?.data.author.firstName + " " + challenge?.data.author.lastName}
          />

          <div className="details__grid__tags">
            <Tags tags={challenge?.data?.tags} />

            <div className="details__grid__level">
              <Badge
                color={challenge?.data.difficulty.color}
                content={challenge?.data.difficulty.sortLevel}>
                {challenge?.data.difficulty.label}
              </Badge>
              <span>{challenge?.data.difficulty.label}</span>
            </div>
          </div>

          <Button
            type="button"
            theme={"primary"}
            styles={{ placeSelf: "center" }}
            handleClick={() => setDisplaySolutions(!displaySolutions)}>
            <Svg
              id="arrow"
              styles={{ width: "4.5rem", height: "3.3rem", strokeWidth: "initial" }}
            />
            {!displaySolutions ? t("Check solutions") : t("Challenge details")}
          </Button>
        </div>
      </Filters>
      {!displaySolutions ? (
        <Container center>
          <Sorts
            title={t("Challenge")}
            displayResult={false}
            actions={
              true && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "1rem"
                  }}>
                  <Like
                    showNumber={true}
                    id={challenge?.data.id}
                    isAlreadyLiked={challenge?.data.isLiked}
                    likesCount={challenge?.data.likesCount}
                  />
                  <BulletPoint />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "1rem"
                    }}>
                    <Svg id="comment" styles={{ width: "2rem", height: "2rem" }} />
                    <p className="comment__count">{challenge?.data.commentsCount}</p>
                  </div>
                </div>
              )
            }>
            <span className="details__sort__date">
              {t("Published on ") + dateToFormat(new Date(challenge?.data.createdAt))}
            </span>
          </Sorts>

          <div className="details__recap">
            <div className="details__recap__resume">
              <div className="details__recap__resume__description">
                <Heading tag={"h2"} level={"secondary"} styles={{ marginBottom: "1.5rem" }}>
                  {t("Description")}
                </Heading>
                <Paragraph color="dark" isHtml={true}>
                  {DOMPurify.sanitize(challenge?.data?.description ?? "")}
                </Paragraph>
              </div>
              <div
                className="details__recap__resume__img"
                style={{ flexDirection: `${pictures?.length <= 2 ? "column" : "row"}` }}>
                {pictures?.map((resource: any, i: number) => {
                  return (
                    <div
                      style={{ width: `calc((100% - 1rem)/ ${pictures?.length >= 3 ? 2 : 1})` }}
                      key={i}>
                      <Image
                        src={resource.value}
                        alt={resource.label ?? challenge?.data.title}
                        height={pictures?.length === 2 ? "175" : "auto"}
                        width="100%"
                        key={i}
                        classes="squarepic"
                      />
                    </div>
                  );
                })}
              </div>
              <Button
                type="submit"
                theme={"primary"}
                handleClick={() => {
                  setDisplaySolution(!displaySolution);
                }}>
                <Svg
                  id="arrow"
                  styles={{ width: "4.5rem", height: "3.3rem", strokeWidth: "initial" }}
                />
                {t("start challenge !")}
              </Button>
            </div>
            <div className="details__recap__instruction">
              <Heading tag={"h2"} level={"secondary"} styles={{ marginBottom: "1.5rem" }}>
                {t("Instructions")}
              </Heading>
              <p>{t("instruction_front_reproduction")}</p>
              {files?.length > 0 && (
                <div className="details__recap__instruction__file">
                  <Label name="zipfile">{t("Additional Resources")}</Label>
                  <a href={files[0].value} className="btn__input" download>
                    <Svg id="folder" styles={{ strokeWidth: "0" }} />
                    {t("download")}
                  </a>
                </div>
              )}

              {links?.length > 0 && (
                <div className="details__recap__instruction__file">
                  <Label name="urls">{t("Complementary informations")}</Label>
                  <a href={links[0].value} className="btn__input">
                    <Svg id="arrow" styles={{ strokeWidth: "0" }} />
                    {t("go to") + " " + links[0].label}
                  </a>
                </div>
              )}
            </div>
          </div>

          {displaySolution && (
            <div className="details__solution">
              <button
                type="button"
                className="multiForm__content__buttons__back"
                style={{ position: "absolute", left: "2rem", top: "2rem" }}
                onClick={() => {
                  setDisplaySolution(!displaySolution);
                }}>
                <Svg id="cross" styles={{ width: "2rem", height: "2rem" }} />
              </button>
              <Heading tag={"h3"} level={"secondary"} styles={{ paddingTop: "1rem" }}>
                {t("Take up the challenge !")}
              </Heading>
              <Paragraph color="dark" isHtml={true} styles={{ margin: "3rem 0" }}>
                {t("paragraph_start_solution")}
              </Paragraph>
              <TabsProvider>
                <Tabs
                  tabs={[
                    {
                      tabTitle: "Upload files",
                      tabContent: (
                        <SolutionUpload
                          handleFile={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.currentTarget.files;
                            if (file) {
                              setQuerySolution({
                                ...querySolution,
                                resources: [
                                  {
                                    value: file[0],
                                    type: "file"
                                  }
                                ]
                              });
                            }
                          }}
                          url={querySolution.url}
                          handleUrl={(e: any) => {
                            setQuerySolution({ ...querySolution, url: e });
                          }}
                          recap={querySolution.recap}
                          handleRecap={(e: any) => {
                            setQuerySolution({ ...querySolution, recap: e });
                          }}
                        />
                      ),
                      anchor: "#upload"
                    },
                    {
                      tabTitle: "Code online",
                      tabContent: <SolutionCode></SolutionCode>,
                      anchor: "#code"
                    }
                  ]}
                  anchorNavigation={false}
                />
              </TabsProvider>
              <Button
                type="submit"
                theme={"primary"}
                styles={{ position: "absolute", bottom: "-1rem", right: "4rem" }}
                handleClick={() => {
                  isConnected
                    ? handleSolution()
                    : pushToast({
                        theme: "secondary",
                        title: t("You must be logged in"),
                        desc: t("You must be logged in to submit a solution")
                      });
                }}>
                <Svg
                  id="arrow"
                  styles={{ width: "4.5rem", height: "3.3rem", strokeWidth: "initial" }}
                />
                {t("submit solution !")}
              </Button>
            </div>
          )}

          <Sorts
            title={t("Challenge's comments")}
            nbResult={challenge?.data.commentsCount}
            actions={
              true && (
                <Heading tag={"h3"} level={"secondary"}>
                  <Block
                    withSquare={true}
                    styles={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.5rem",
                      paddingRight: "1rem",
                      borderRadius: "1rem"
                    }}>
                    {t("Comments")}
                  </Block>
                </Heading>
              )
            }
            styles={{ marginBottom: "1rem", zIndex: "5", position: "relative" }}>
            <Multiselect
              callback={(value: any) => {
                setCommentsQuery({
                  ...commentsQuery,
                  order: value[0]?.order,
                  orderBy: value[0]?.orderBy
                });
              }}
              styles={{ minWidth: "20rem" }}
              theme={"primary"}
              multiple={false}
              searchable={false}
              defaultText="sort"
              options={[
                {
                  label: t("Created At"),
                  children: [
                    {
                      id: 1,
                      label: t("Latest"),
                      orderBy: "createdAt",
                      order: "desc"
                    },
                    {
                      id: 2,
                      label: t("Oldest"),
                      order: "asc",
                      orderBy: "createdAt"
                    }
                  ]
                },
                {
                  label: t("Popularity"),
                  children: [
                    {
                      id: 3,
                      label: t("Trending"),
                      orderBy: "likesCount",
                      order: "desc"
                    }
                  ]
                }
              ]}
            />
          </Sorts>

          <Wysiwyg
            callback={(value: any) => {
              setComment(value);
            }}
            value={comment}
            maxHeight={800}
            placeholder={t("Add a comment...")}
            color={mainColor}>
            <Button
              type="submit"
              theme={"primary"}
              handleClick={() => {
                isConnected
                  ? handleComment()
                  : pushToast({
                      theme: "secondary",
                      title: t("You must be logged in"),
                      desc: t("You must be logged in to publish a comment")
                    });
              }}>
              <Svg
                id="back"
                styles={{ width: "2rem", height: "2rem", rotate: "180deg", fill: "#171717" }}
              />
              {t("Comment")}
            </Button>
          </Wysiwyg>

          <Grid size="100%" styles={{ marginTop: "2rem", gap: "2rem" }}>
            {comments?.pages?.map((group, i) => {
              return (
                <Fragment key={i}>
                  {group?.data?.["hydra:member"].map((comment: any) => {
                    return <Comment comment={comment} key={comment?.id} />;
                  })}
                </Fragment>
              );
            })}
          </Grid>

          <div
            className="loader--container"
            ref={loadRef}
            style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}>
            {isFetchingNextPage && <DotLoader theme="primary" />}
          </div>
        </Container>
      ) : (
        <ChallengeSolutions
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          id={parseInt(id!)}
          createSolution={() => {
            setDisplaySolutions(!displaySolutions);
            setDisplaySolution(true);
          }}
        />
      )}
    </PageTransition>
  );
}
