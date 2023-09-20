import Block from "@/components/01 - Atoms/Block/Block";
import { BulletPoint } from "@/components/01 - Atoms/BulletPoint/BulletPoint";
import Button from "@/components/01 - Atoms/Button/Button";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import Paragraph from "@/components/01 - Atoms/Paragraph/Paragraph";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Wysiwyg from "@/components/01 - Atoms/Wysiwyg/Wysiwyg";
import Grid from "@/components/02 - Molecules/Grid/Grid";
import Like from "@/components/02 - Molecules/Like/Like";
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect";
import Sorts from "@/components/02 - Molecules/Sorts/Sorts";
import { AuthContext } from "@/contexts/AuthContext";
import { ThemesContext } from "@/contexts/ThemesContext";
import useToasts from "@/hooks/useToasts";
import { dateToFormat } from "@/services/date";
import { getSolution } from "@/services/solutions.service";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { t } from "i18next";
import { useCallback, useContext, useEffect, useState } from "react";
import Comment from "@/components/02 - Molecules/Comment/Comment";
import './SolutionDetail.scss';
import { postComment } from "@/services/comments.service";
import Label from "@/components/01 - Atoms/Label/Label";

export interface ISolutionDetail {
    id: number;
    Dismiss: Function;
}

export default function SolutionDetail({ id, Dismiss }: ISolutionDetail) {
    const { mainColor } = useContext(ThemesContext);
    const { isConnected } = useContext(AuthContext);
    const { pushToast } = useToasts();

    const [comment, setComment] = useState<string>("");
    const [files, setFiles] = useState<Array<any>>([]);
    const [links, setLinks] = useState<Array<any>>([]);
    const { data: solution } = useQuery(["solution"], () => getSolution({ id: id }));

    useEffect(() => {
        console.log(solution);
        setFiles(solution?.data.resources.filter((resource: any) => resource.type === 'file'));
        setLinks(solution?.data.resources.filter((resource: any) => resource.type === 'url'));
    }, [solution]);

    const handleComment = useCallback(() => {
        postComment({ content: comment, parent: solution?.data['@id'] });
        setComment("");
    }, [comment]);

    return (
        <div>
            <Sorts
                title={t("Challenge")}
                displayResult={false}
                styles={{ marginBottom: "1rem" }}
                actions={
                    true && (
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem' }}>
                            <Like showNumber={true} id={solution?.data.id} isAlreadyLiked={solution?.data.isLiked} likesCount={solution?.data.likesCount} type="Solution" />
                            <BulletPoint />
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem' }}>
                                <Svg id="comment" styles={{ width: "2rem", height: "2rem" }} />
                                <p className="comment__count">{solution?.data.commentsCount}</p>
                            </div>
                        </div>
                    )
                }>
                <span className="details__sort__date">{t("Published on ") + dateToFormat(new Date(solution?.data.createdAt ?? solution?.data.updatedAt))}</span>
            </Sorts>

            <div className="details__recap__resume">
                <div className="details__recap__resume__description">
                    <Heading tag={"h2"} level={"secondary"} styles={{ marginBottom: "1.5rem", textAlign: "left" }}>
                        {t("Description")}
                    </Heading>
                    <Paragraph color="dark" isHtml={true}>
                        {DOMPurify.sanitize(solution?.data.recap)}
                    </Paragraph>
                </div>
                <div>
                    {files?.length > 0 &&
                        <div className="details__recap__instruction__file" style={{ margin: '0', border: 'none' }}>
                            <Label name="zipfile">
                                {t("Additional Resources")}
                            </Label>
                            <a href={files[0].value} className="btn__input" download>
                                <Svg id="folder" styles={{ strokeWidth: '0' }} />
                                {t("download")}
                            </a>
                        </div>
                    }

                    {links?.length > 0 &&
                        <div className="details__recap__instruction__file" style={{ border: "none" }}>
                            <Label name="urls">
                                {t("Complementary informations")}
                            </Label>
                            <a href={links[0].value} className="btn__input">
                                <Svg id="arrow" styles={{ strokeWidth: '0' }} />
                                {t("go to") + ' ' + links[0].label}
                            </a>
                        </div>
                    }
                </div>

            </div>

            <Sorts
                title={t("Challenge's comments")}
                nbResult={solution?.data.commentsCount}
                actions={
                    true && (
                        <Heading tag={"h3"} level={"secondary"}>
                            <Block withSquare={true} styles={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem', paddingRight: '1rem', borderRadius: '1rem' }}>
                                {t("Comments")}
                            </Block>
                        </Heading>
                    )
                }
                styles={{ marginBottom: "1rem", zIndex: "5", position: "relative" }}>
                <Multiselect
                    callback={(value: any) => {
                        //setCommentsQuery({ ...commentsQuery, order: value[0]?.order, orderBy: value[0]?.orderBy });
                    }}
                    styles={{ minWidth: '20rem' }}
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
                        },

                    ]}
                />
            </Sorts>

            <Wysiwyg
                callback={(value: any) => {
                    setComment(value);
                }}
                value={comment}
                placeholder={t("Add a comment...")}
                color={mainColor}>
                <Button type="submit" theme={"primary"} handleClick={() => {
                    isConnected
                        ? handleComment()
                        : pushToast({
                            theme: "secondary",
                            title: t("You must be logged in"),
                            desc: t("You must be logged in to publish a comment")
                        });
                }}>
                    <Svg id="back" styles={{ width: "2rem", height: "2rem", rotate: "180deg", fill: "#171717" }} />
                    {t("Comment")}
                </Button>
            </Wysiwyg>

            <Grid size="100%" styles={{ marginTop: '2rem', gap: '2rem' }}>
                {solution?.data.comments.map((comment: any, i: number) => {
                    return (
                        <Comment comment={comment} key={i} />
                    );
                })}
            </Grid>
        </div>
    );
};