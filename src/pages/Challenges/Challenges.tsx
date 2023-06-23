import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import Label from "@/components/01 - Atoms/Label/Label";
import Search from "@/components/01 - Atoms/Search/Search";
import Tooltip from "@/components/01 - Atoms/Tooltip/Tooltip";
import Filters from "@/components/02 - Molecules/Filters/Filters";
import Sorts from "@/components/02 - Molecules/Sorts/Sorts";
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect";
import Tags from "@/components/02 - Molecules/Tags/Tags";
import PageTransition from "@/components/04 - Templates/PageTransition/PageTransition";
import { ThemesContext } from "@/contexts/ThemesContext";
import Container from "@/components/01 - Atoms/Container/Container";
import Grid from "@/components/02 - Molecules/Grid/Grid";
import Card from "@/components/03 - Organisms/Card/Card";
import DotLoader from "@/components/01 - Atoms/DotLoader/DotLoader";
import {
  getTagFamilies,
  getCategories,
  getDifficulties,
  getChallenges
} from "@/services/challenges.service";

export default function Challenges() {
  const loadRef = useRef(null);
  const [query, setQuery] = useState({});
  const isInView = useInView(loadRef);
  const { mainColor } = useContext(ThemesContext);
  const { data: categories } = useQuery(["categories"], () => getCategories({ paginate: false }));
  const { data: difficulties } = useQuery(["difficulties"], () =>
    getDifficulties({ paginate: false })
  );

  const { data: tagFamilies } = useQuery(["tagFamilies", query?.categories], () =>
    getTagFamilies({ paginate: false, categories: query?.categories })
  );

  const {
    data: challenges,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["challenges", query],
    keepPreviousData: true,
    queryFn: ({ pageParam = 1 }) => getChallenges({ pageParam, ...query }),
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

  return (
    <PageTransition>
      <Filters
        theme={mainColor}
        headContent={
          <>
            <Label name="filter">Categories</Label>
            <Multiselect
              callback={(value: any) => {
                setQuery({ ...query, categories: value });
              }}
              theme={"primary"}
              searchable={true}
              defaultText="Categories"
              options={categories?.data ?? []}
            />
            <Label name="search">Search</Label>
            <Search placeholder={"Type something here..."} />
            <Label name="type">Filter by</Label>
            <Multiselect
              callback={(value: any) => {
                setQuery({ ...query, tags: value });
              }}
              theme={"primary"}
              searchable={true}
              defaultText="Tag"
              options={
                tagFamilies?.data.map((family: any) => {
                  return {
                    label: family.label,
                    children: family.tags
                  };
                }) ?? []
              }
            />
            <Label name="type">Level</Label>
            <Multiselect
              callback={(value: any) => {
                setQuery({ ...query, difficulties: value });
              }}
              theme={"primary"}
              searchable={true}
              defaultText="Level"
              options={difficulties?.data ?? []}
            />
          </>
        }>
        <Tags tags={query?.tags} />
        <div className="filters__indications">
          <p>About our challenges categories</p>
          <Tooltip theme="primary">test</Tooltip>
        </div>
      </Filters>
      <Container center>
        <Sorts title="Challenges" nbResult={challenges?.pages[0].data["hydra:totalItems"]}>
          <Multiselect
            callback={(value: any) => {
              setQuery({ ...query, order: value[0]?.order, orderBy: value[0]?.orderBy });
            }}
            theme={"primary"}
            multiple={false}
            options={[
              {
                label: "Created At",
                children: [
                  {
                    id: 1,
                    label: "Latest",
                    orderBy: "createdAt",
                    order: "desc",
                    default: true
                  },
                  {
                    id: 2,
                    label: "Oldest",
                    order: "asc",
                    orderBy: "createdAt"
                  }
                ]
              },
              {
                label: "Level",
                children: [
                  {
                    id: 1,
                    label: "Most difficult",
                    orderBy: "difficulty.sortLevel",
                    order: "desc",
                    default: true
                  },
                  {
                    id: 2,
                    label: "Less difficult",
                    order: "asc",
                    orderBy: "difficulty.sortLevel"
                  }
                ]
              }
            ]}
          />
        </Sorts>
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
