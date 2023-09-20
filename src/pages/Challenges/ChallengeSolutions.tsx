import Button from "@/components/01 - Atoms/Button/Button";
import Container from "@/components/01 - Atoms/Container/Container";
import DotLoader from "@/components/01 - Atoms/DotLoader/DotLoader";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Grid from "@/components/02 - Molecules/Grid/Grid";
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect";
import Sorts from "@/components/02 - Molecules/Sorts/Sorts";
import CardSolution from "@/components/03 - Organisms/Card/CardSolution";
import SolutionDetail from "@/components/03 - Organisms/Solution/SolutionDetail";
import Dialog from "@/components/04 - Templates/Dialog/Dialog";
import { AuthContext } from "@/contexts/AuthContext";
import { getSolutionsFrom } from "@/services/solutions.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { t } from "i18next";
import { memo, useContext, useEffect, useRef, useState } from "react";

export interface IChallengeSolutions {
  id: number;
  createSolution: Function;
}

export default memo(function ChallengeSolutions({ id, createSolution }: IChallengeSolutions) {
  const { isConnected } = useContext(AuthContext);
  const loadRef = useRef(null);
  const isInView = useInView(loadRef);
  const [isSolutionDetailOpen, setIsSolutionDetailOpen] = useState<boolean>(false);
  const [currentSolution, setCurrentSolution] = useState<number | null>(null);

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
    queryFn: ({ pageParam = 1 }) => getSolutionsFrom({ pageParam, ...query }),
    getNextPageParam: (lastPage, pages) => {
      const urlParams = new URLSearchParams(lastPage.data["hydra:view"]?.["hydra:next"]);
      return urlParams.get("page") ?? null;
    }
  });

  useEffect(() => {
    console.log(solutions);
  }, [solutions]);

  useEffect(() => {
    if (isInView && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage]);

  return (
    <>
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
                  onclick={() => {
                    setCurrentSolution(solution.id);
                    setIsSolutionDetailOpen(!isSolutionDetailOpen);
                  }}
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
        id="solution_detail"
        styles={{ maxWidth: '70rem', padding: '2rem' }}
        visible={isSolutionDetailOpen}
        Dismiss={() => {
          setIsSolutionDetailOpen(!isSolutionDetailOpen);
        }}>
        {currentSolution &&
          <SolutionDetail id={currentSolution} Dismiss={() => {
            setIsSolutionDetailOpen(!isSolutionDetailOpen);
          }} />
        }
      </Dialog>
    </>
  );
});
