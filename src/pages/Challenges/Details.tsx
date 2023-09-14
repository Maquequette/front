import Filters from "@/components/02 - Molecules/Filters/Filters";
import PageTransition from "@/components/04 - Templates/PageTransition/PageTransition";
import { ThemesContext } from "@/contexts/ThemesContext";
import { useContext, useEffect, useState } from "react";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import ProfileButton from "@/components/01 - Atoms/ProfileButton/ProfileButton";
import "./Details.scss";
import Button from "@/components/01 - Atoms/Button/Button";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import { useTranslation } from "react-i18next";
import Tags from "@/components/02 - Molecules/Tags/Tags";
import Badge from "@/components/01 - Atoms/Badge/Badge";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getChallenge } from "@/services/challenges.service";
import { AuthContext } from "@/contexts/AuthContext";
import Container from "@/components/01 - Atoms/Container/Container";
import Sorts from "@/components/02 - Molecules/Sorts/Sorts";
import { dateToFormat } from "@/services/date";
import { BulletPoint } from "@/components/01 - Atoms/BulletPoint/BulletPoint";
import Like from "@/components/02 - Molecules/Like/Like";

export default function Challenges() {

    const { t } = useTranslation();
    const { mainColor } = useContext(ThemesContext);

    const { isConnected } = useContext(AuthContext);

    const { data: challenge } = useQuery(["challenge"], () => getChallenge({ id: 23 }));

    useEffect(() => {
        console.log(challenge);
    }, [challenge]);

    return (
        <PageTransition>
            <Filters theme={mainColor}>
                <div className="details__grid">
                    <Heading tag="h1" level="secondary" styles={{ display: 'flex', alignItems: 'center' }}>
                        {challenge?.data.title}
                    </Heading>

                    <ProfileButton id={challenge?.data.author.id} username={challenge?.data.author.firstName + ' ' + challenge?.data.author.lastName} />

                    <div className="details__grid__tags">

                        <Tags tags={challenge?.data?.tags} />

                        <div className="details__grid__level">
                            <Badge color={challenge?.data.difficulty.color} content={challenge?.data.difficulty.sortLevel}>
                                {challenge?.data.difficulty.label}
                            </Badge>
                            <span>{challenge?.data.difficulty.label}</span>
                        </div>
                    </div>

                    <Button type="submit" theme={"primary"} styles={{ placeSelf: 'center' }}>
                        <Svg
                            id="arrow"
                            styles={{ width: "4.5rem", height: "3.3rem", strokeWidth: "initial" }}
                        />
                        {t("Check solutions")}
                    </Button>
                </div>
            </Filters>
            <Container center>
                <Sorts
                    title={t("Challenge")}
                    actions={
                        true && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem' }}>
                                <Like showNumber={true} id={challenge?.data.id} isAlreadyLiked={challenge?.data.isLiked} likesCount={challenge?.data.likesCount} />
                                <BulletPoint />
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem' }}>
                                    <Svg id="comment" styles={{ width: "2rem", height: "2rem" }} />
                                    <p className="comment__count">{challenge?.data.commentsCount}</p>
                                </div>
                            </div>
                        )
                    }>
                    <span className="details__sort__date">{t("Published on ") + dateToFormat(new Date(challenge?.data.createdAt))}</span>
                </Sorts>
            </Container>
        </PageTransition>
    )
}