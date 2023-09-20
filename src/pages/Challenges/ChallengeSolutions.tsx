import Button from "@/components/01 - Atoms/Button/Button";
import Container from "@/components/01 - Atoms/Container/Container";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Grid from "@/components/02 - Molecules/Grid/Grid";
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect";
import Sorts from "@/components/02 - Molecules/Sorts/Sorts";
import CardSolution from "@/components/03 - Organisms/Card/CardSolution";
import { AuthContext } from "@/contexts/AuthContext";
import { getSolutionsFrom } from "@/services/solutions.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { t } from "i18next";
import { memo, useContext, useState } from "react";

export interface IChallengeSolutions {
  id: number;
  createSolution: () => void;
}

export default memo(function ChallengeSolutions({ id, createSolution }: IChallengeSolutions) {
  const { isConnected } = useContext(AuthContext);

  const [query, setQuery] = useState<any>({
    order: undefined,
    orderBy: undefined,
    parent: id
  });

  const {
    data: solutions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ["solutions", query],
    keepPreviousData: true,
    queryFn: async ({ pageParam = 1 }) => await getSolutionsFrom({ pageParam, ...query }),
    getNextPageParam: (lastPage, pages) => {
      const urlParams = new URLSearchParams(lastPage.data["hydra:view"]?.["hydra:next"]);
      return urlParams.get("page") ?? null;
    }
  });

  return (
    <Container center>
      <Sorts
        title={t("Solutions")}
        nbResult={solutions?.pages[0].data["hydra:totalItems"]}
        actions={
          isConnected && (
            <Button theme="success" handleClick={() => createSolution()}>
              {t("Create a solution")}
              <Svg id="create" />
            </Button>
          )
        }>
        <Multiselect
          callback={(value: any) => {}}
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
      <Grid size="20rem">
        {solutions?.pages?.map((group, i) => {
          return group?.data?.["hydra:member"].map((solution: any) => {
            return (
              <CardSolution
                id={solution.id}
                recap={solution.recap}
                key={solution.id}
                author={solution.author}
                isLiked={solution.isLiked}
                likesCount={solution.likesCount}
                commentsCount={solution.commentsCount}
                date={new Date(solution.updatedAt ?? solution.createdAt)}
              />
            );
          });
        })}
      </Grid>
    </Container>
  );
});
