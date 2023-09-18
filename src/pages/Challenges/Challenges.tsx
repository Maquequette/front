import { useContext, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
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
import Button from "@/components/01 - Atoms/Button/Button";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Dialog from "@/components/04 - Templates/Dialog/Dialog";
import DefineChallenge from "@/components/03 - Organisms/DefineChallenge/DefineChallenge";
import {
  getTagFamilies,
  getCategories,
  getDifficulties,
  getChallenges
} from "@/services/challenges.service";
import { AuthContext } from "@/contexts/AuthContext";

export default function Challenges() {
  const [query, setQuery] = useState({
    categories: undefined,
    tags: undefined,
    type: undefined,
    difficulties: undefined,
    order: undefined,
    orderBy: undefined
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const loadRef = useRef(null);
  const isInView = useInView(loadRef);
  const { mainColor } = useContext(ThemesContext);
  const { t } = useTranslation();
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
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ["challenges", query],
    keepPreviousData: true,
    queryFn: ({ pageParam = 1 }) => getChallenges({ pageParam, ...query }),
    getNextPageParam: (lastPage, pages) => {
      const urlParams = new URLSearchParams(lastPage.data["hydra:view"]?.["hydra:next"]);
      return urlParams.get("page") ?? null;
    }
  });

  const { isConnected } = useContext(AuthContext);

  useEffect(() => {
    if (isInView && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage]);

  return (
    <PageTransition>
      <Filters
        theme={mainColor}
        headContent={
          <>
            <Label name="filter">{t("Categories")}</Label>
            <Multiselect
              callback={(value: any) => {
                setQuery({ ...query, categories: value });
              }}
              theme={"primary"}
              defaultText="Categories"
              options={categories?.data ?? []}
            />

            <Label name="search">{t("Search")}</Label>
            <Search placeholder={t("Type something here...")} />

            <Label name="type">{t("Filter by")}</Label>
            <Multiselect
              callback={(value: any) => {
                setQuery({ ...query, tags: value });
              }}
              theme={"primary"}
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

            <Label name="type">{t("Level")}</Label>
            <Multiselect
              callback={(value: any) => {
                setQuery({ ...query, difficulties: value });
              }}
              theme={"primary"}
              multiple={false}
              searchable={true}
              defaultText={t("Level")}
              options={difficulties?.data ?? []}
            />
          </>
        }>
        <Tags tags={query?.tags} />
        <div className="filters__indications">
          <p>{t("About our challenges categories")}</p>
          <Tooltip theme="primary">test</Tooltip>
        </div>
      </Filters>
      <Container center>
        <Sorts
          title={t("Challenges")}
          nbResult={challenges?.pages[0].data["hydra:totalItems"]}
          actions={
            isConnected && (
              <Button
                theme="success"
                handleClick={() => {
                  setIsCreateModalOpen(!isCreateModalOpen);
                }}>
                {t("Create a challenge")}
                <Svg id="create" />
              </Button>
            )
          }>
          <Multiselect
            callback={(value: any) => {
              setQuery({ ...query, order: value[0]?.order, orderBy: value[0]?.orderBy });
            }}
            styles={{ minWidth: "20rem" }}
            theme={"primary"}
            defaultText={t("sort")}
            multiple={false}
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
                label: t("Level"),
                children: [
                  {
                    id: 3,
                    label: t("Most difficult"),
                    orderBy: "difficulty.sortLevel",
                    order: "desc"
                  },
                  {
                    id: 4,
                    label: t("Less difficult"),
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
            return group?.data?.["hydra:member"].map((challenge: any) => {
              return (
                <Card
                  img={challenge?.resources?.[0]?.value}
                  path={`/challenges/${challenge.id}`}
                  likesCount={challenge.challengeLikesCount}
                  id={challenge.id}
                  isLiked={challenge.isLiked}
                  badge={challenge.difficulty}
                  tags={challenge.tags}
                  key={challenge.id}
                  date={new Date(challenge.updatedAt ?? challenge.createdAt)}
                  title={challenge.title}
                  desc={challenge.description}
                  author={`${challenge.author.firstName} ${challenge.author.lastName}`}
                />
              );
            });
          })}
        </Grid>
        <div
          className="loader--container"
          ref={loadRef}
          style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}>
          {isFetchingNextPage || (isLoading && <DotLoader theme="primary" />)}
        </div>
      </Container>
      <Dialog
        id="create_challenge"
        visible={isCreateModalOpen}
        Dismiss={() => {
          setIsCreateModalOpen(!isCreateModalOpen);
        }}>
        <DefineChallenge
          Dismiss={() => {
            setIsCreateModalOpen(!isCreateModalOpen);
          }}
        />
      </Dialog>
    </PageTransition>
  );
}
