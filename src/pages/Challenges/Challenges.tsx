import { Fragment, useContext, useEffect, useRef } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Label from "@/components/01 - Atoms/Label/Label";
import Search from "@/components/01 - Atoms/Search/Search";
import Tooltip from "@/components/01 - Atoms/Tooltip/Tooltip";
import Filters from "@/components/02 - Molecules/Filters/Filters";
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect";
import Tags from "@/components/02 - Molecules/Tags/Tags";
import PageTransition from "@/components/04 - Templates/PageTransition/PageTransition";
import { ThemesContext } from "@/contexts/ThemesContext";
import Container from "@/components/01 - Atoms/Container/Container";
import Grid from "@/components/02 - Molecules/Grid/Grid";
import Card from "@/components/03 - Organisms/Card/Card";
import DotLoader from "@/components/01 - Atoms/DotLoader/DotLoader";
import {
  getChallengeTypes,
  getCategories,
  getDifficulties,
  getChallenges
} from "@/services/challenges.service";
import { useInView } from "framer-motion";

export default function Challenges() {
  const loadRef = useRef(null);
  const isInView = useInView(loadRef);
  const { mainColor } = useContext(ThemesContext);
  const { data: types } = useQuery(["types"], () => getChallengeTypes({ paginate: false }));
  const { data: categories } = useQuery(["categories"], () => getCategories({ paginate: false }));
  const { data: difficulties } = useQuery(["difficulties"], () =>
    getDifficulties({ paginate: false })
  );

  const {
    data: challenges,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["challenges"],
    queryFn: getChallenges,
    getNextPageParam: (lastPage, pages) => {
      const urlParams = new URLSearchParams(lastPage.data["hydra:view"]["hydra:next"]);
      return urlParams.get("page") ?? null;
    }
  });

  useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage]);

  return (
    <PageTransition>
      <Filters
        theme={mainColor}
        headContent={
          <>
            <Label name="type">type</Label>
            <Multiselect theme={"primary"} multiple={true} options={types?.data ?? []} />
            <Label name="search">search</Label>
            <Search placeholder={"Type something here..."} />
            <Label name="filter">Filter by</Label>
            <Multiselect
              theme={"primary"}
              searchable={true}
              defaultText="Technologies, sketch format, level"
              options={[
                {
                  label: "Categories",
                  children: categories?.data
                },
                {
                  label: "Levels",
                  children: difficulties?.data
                }
              ]}
            />
            <Label name="sort">Sort by</Label>
            <Multiselect
              theme={"primary"}
              multiple={false}
              options={[
                {
                  id: "ASC",
                  label: "Latest",
                  default: true
                },
                {
                  id: "DESC",
                  label: "Oldest"
                }
              ]}
            />
          </>
        }>
        <Tags
          tags={[
            {
              label: "HTML",
              theme: "success"
            }
          ]}
        />
        <div className="filters__indications">
          <p>About our challenges categories</p>
          <Tooltip theme="primary">test</Tooltip>
        </div>
      </Filters>
      <Container center>
        <Grid size="33rem">
          {challenges?.pages?.map((group, i) => {
            return (
              <Fragment key={i}>
                {group?.data?.["hydra:member"].map((challenge: any) => {
                  return (
                    <Card
                      badge={challenge.difficulty}
                      tags={challenge.tags}
                      id={challenge.id}
                      path={`/challenges/${challenge.id}`}
                      key={challenge.id}
                      date={new Date(challenge.updatedAt ?? challenge.createdAt)}
                      title={challenge.title}
                      desc={challenge.description}
                      author={`${challenge.author.firstName} ${challenge.author.lastName}`}
                    />
                  );
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
    </PageTransition>
  );
}
