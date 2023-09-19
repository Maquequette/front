import { BulletPoint } from '@/components/01 - Atoms/BulletPoint/BulletPoint';
import Like from '../Like/Like';
import './Comment.scss'
import { useTranslation } from 'react-i18next';
import { dateToFormat } from "@/services/date";
import ProfileButton from '@/components/01 - Atoms/ProfileButton/ProfileButton';
import Button from '@/components/01 - Atoms/Button/Button';
import Svg from '@/components/01 - Atoms/Svg/Svg';
import Wysiwyg from '@/components/01 - Atoms/Wysiwyg/Wysiwyg';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ThemesContext } from '@/contexts/ThemesContext';
import { getCommentsFrom, postComment } from '@/services/comments.service';
import DOMPurify from 'dompurify';
import Paragraph from '@/components/01 - Atoms/Paragraph/Paragraph';
import useToasts from '@/hooks/useToasts';
import { AuthContext } from '@/contexts/AuthContext';

export interface IComment {
    comment: any
}

export default function Comment({ comment }: IComment) {
    const { t } = useTranslation();
    const { mainColor } = useContext(ThemesContext);
    const { pushToast } = useToasts();
    const { isConnected } = useContext(AuthContext);
    const [reply, setReply] = useState<any>(null);

    const [editReply, setEditReply] = useState<boolean>(false);
    const [children, setChildren] = useState<Array<any>>([]);

    useEffect(() => {
        if (comment.comments) {
            setChildren(comment.comments);
        }
    });

    const handleReply = useCallback(() => {
        if (editReply) {
            postComment({ content: reply, parent: comment['@id'] });
            setReply("");
        }
        setEditReply(!editReply);
    }, [reply]);

    const moreReply = useCallback(async () => {
        let results = await getCommentsFrom({ parent: comment.id });
        setChildren((children: any) => [...children, ...results?.data['hydra:member']]);
    }, []);

    return (
        <div className="comment">
            <div className="comment__header">
                <div className="comment__header__infos">
                    <Like showNumber={true} id={comment.id} isAlreadyLiked={comment.isLiked} likesCount={comment.likesCount} type="Comment" />
                    <BulletPoint />
                    <span>
                        {t("Posted on") + ' ' + dateToFormat(new Date(comment.createdAt), "dd/mm/yyyy") + ' ' + t("at") + ' ' + dateToFormat(new Date(comment.createdAt), "hh:mm")}
                    </span>
                </div>
                <ProfileButton id={comment.author.id} username={comment.author.firstName + ' ' + comment.author.lastName} />
            </div>
            <div className="comment__body">
                <div className="comment__body__principal">
                    <Paragraph color="dark" isHtml={true}>
                        {DOMPurify.sanitize(comment.content)}
                    </Paragraph>

                    {editReply &&
                        <div className="comment__body__reply">
                            <Wysiwyg
                                callback={(value: any) => {
                                    setReply(value);
                                }}
                                value={reply}
                                maxHeight={800}
                                placeholder={t("Add a comment...")}
                                color={mainColor}>
                            </Wysiwyg>
                        </div>
                    }

                    <div className="comment__body__btns">
                        <Button type="submit" theme={"primary"} handleClick={() => {
                            isConnected
                                ? handleReply()
                                : pushToast({
                                    theme: "secondary",
                                    title: t("You must be logged in"),
                                    desc: t("You must be logged in to reply")
                                });
                        }}>
                            <Svg id="back" styles={{ width: "2rem", height: "2rem", rotate: "180deg", fill: "#171717" }} />
                            {t("Reply")}
                        </Button>
                        {editReply &&
                            <button
                                type="button"
                                className="multiForm__content__buttons__back"
                                onClick={() => {
                                    setEditReply(!editReply);
                                    setReply('');
                                }}>
                                <Svg id="cross" styles={{ width: "2rem", height: "2rem" }} />
                            </button>
                        }
                    </div>
                </div>
                {(children.length === 0 && comment.commentsCount > 0) &&
                    <button className="comment__body__count" onClick={moreReply}>
                        <span>
                            {"+ " + comment.commentsCount + " " + t("more messages")}
                        </span>
                    </button>
                }
                {children.length !== 0 &&
                    <div className="comment__body__children">
                        {children?.map((reply: any, i: number) => {
                            return (
                                <Comment comment={reply} key={i} />
                            );
                        })}
                    </div>
                }
            </div>
        </div>
    );
}