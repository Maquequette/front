import { useContext, useMemo, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import useClickOutside from "@/hooks/useClickOutside";
import { getLikedChallenges, getCreatedChallenge } from "@/services/challenges.service";
import Container from "@/components/01 - Atoms/Container/Container";
import Paragraph from "@/components/01 - Atoms/Paragraph/Paragraph";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import Grid from "@/components/02 - Molecules/Grid/Grid";
import Card from "@/components/03 - Organisms/Card/Card";
import "./Profil.scss";
import { TabsProvider } from "@/contexts/TabsContext";
import Tabs from "@/components/03 - Organisms/Tabs/Tabs";

export default function Profil() {
  const { user, setUser } = useContext(AuthContext);
  const { t } = useTranslation();
  const [editedInfo, setEditedInfo] = useState(-1);
  const [newInfo, setNewInfo] = useState("");
  const ref = useClickOutside(() => setEditedInfo(-1));

  const userInfo = useMemo(() => {
    return [
      {
        key: "lastName",
        label: t("Last Name"),
        value: user.lastName
      },
      {
        key: "firstName",
        label: t("First Name"),
        value: user.firstName
      },
      {
        key: "email",
        label: t("Email"),
        value: user.email
      }
    ];
  }, [user]);

  const handleEditing = (index: number) => {
    if (index === editedInfo) {
      setEditedInfo(-1);
    } else {
      setEditedInfo(index);
      setNewInfo(userInfo[index].value);
    }
  };

  const handleSubmit = (key: string) => {
    setUser({ ...user, [key]: newInfo });
  };

  return (
    <div className="profil">
      <Container isLarge={true} center={true}>
        <div className="profil__container">
          <div className="profil__card" ref={ref}>
            <Heading tag="h1" level="primary">
              {t("Profil Page")}
            </Heading>
            {userInfo.map((info, index) => {
              const isEdited = index === editedInfo;
              return (
                <div
                  className="profil__info"
                  onDoubleClick={() => {
                    handleEditing(index);
                  }}>
                  <Paragraph>
                    <b>{info.label} : </b>
                    {!isEdited && info.value}
                  </Paragraph>
                  {isEdited && (
                    <input
                      className="profil__input"
                      type="text"
                      value={newInfo}
                      onInput={(e: any) => {
                        setNewInfo(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setEditedInfo(-1);
                          handleSubmit(info.key);
                        }
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="profil__content">
            <TabsProvider>
              <Tabs
                tabs={[
                  {
                    tabTitle: t("Liked Challenges"),
                    tabContent: <LikedChallenges />,
                    anchor: "#login"
                  },
                  {
                    tabTitle: t("Challenges you made"),
                    tabContent: <CreatedChallenges />,
                    anchor: "#register"
                  }
                ]}
                anchorNavigation={false}
              />
            </TabsProvider>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function LikedChallenges() {
  const [query, setQuery] = useState({});

  const {
    data: likedChallenges,
    fetchNextPage: fetchLikesChallengesNextPage,
    hasNextPage: likedChallengeshasNextPage,
    isFetchingNextPage: isFetchingLikedChallengesNextPage
  } = useInfiniteQuery({
    queryKey: ["liked_challenges", query],
    keepPreviousData: true,
    queryFn: ({ pageParam = 1 }) => getLikedChallenges({ pageParam, ...query }),
    getNextPageParam: (lastPage, pages) => {
      const urlParams = new URLSearchParams(lastPage.data["hydra:view"]?.["hydra:next"]);
      return urlParams.get("page") ?? null;
    }
  });
  return (
    <Grid size="25rem">
      {likedChallenges?.pages?.map((group, i) => {
        return group?.data?.["hydra:member"].map((challenge: any) => {
          return (
            <Card
              key={challenge.id}
              img={challenge?.resources?.[0]?.value}
              path={`/challenges/${challenge.id}`}
              likesCount={challenge.challengeLikesCount}
              id={challenge.id}
              isLiked={challenge.isLiked}
              badge={challenge.difficulty}
              tags={challenge.tags}
              date={new Date(challenge.updatedAt ?? challenge.createdAt)}
              title={challenge.title}
              desc={challenge.description}
              author={`${challenge.author.firstName} ${challenge.author.lastName}`}
            />
          );
        });
      })}
    </Grid>
  );
}

export function CreatedChallenges() {
  const [query, setQuery] = useState({});
  const {
    data: createdChallenges,
    fetchNextPage: fetchCreatedChallengesNextPage,
    hasNextPage: createdChallengeshasNextPage,
    isFetchingNextPage: isFetchingCreatedChallengesNextPage
  } = useInfiniteQuery({
    queryKey: ["created_challenges", query],
    keepPreviousData: true,
    queryFn: ({ pageParam = 1 }) => getCreatedChallenge({ pageParam, ...query }),
    getNextPageParam: (lastPage, pages) => {
      const urlParams = new URLSearchParams(lastPage.data["hydra:view"]?.["hydra:next"]);
      return urlParams.get("page") ?? null;
    }
  });

  return (
    <Grid size="20rem">
      {createdChallenges?.pages?.map((group, i) => {
        return group?.data?.["hydra:member"].map((challenge: any) => {
          return (
            <Card
              key={challenge.id}
              img={challenge?.resources?.[0]?.value}
              path={`/challenges/${challenge.id}`}
              likesCount={challenge.challengeLikesCount}
              id={challenge.id}
              isLiked={challenge.isLiked}
              badge={challenge.difficulty}
              tags={challenge.tags}
              date={new Date(challenge.updatedAt ?? challenge.createdAt)}
              title={challenge.title}
              desc={challenge.description}
              author={`${challenge.author.firstName} ${challenge.author.lastName}`}
            />
          );
        });
      })}
    </Grid>
  );
}
