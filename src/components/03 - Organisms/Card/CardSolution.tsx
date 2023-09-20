import Paragraph from "@/components/01 - Atoms/Paragraph/Paragraph";
import ProfileButton from "@/components/01 - Atoms/ProfileButton/ProfileButton";
import DOMPurify from "dompurify";
import { memo } from "react";
import Date from "@/components/01 - Atoms/Date/Date";
import { BulletPoint } from "@/components/01 - Atoms/BulletPoint/BulletPoint";
import Like from "@/components/02 - Molecules/Like/Like";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import "./CardSolution.scss";

export interface ICardSolution {
  author: any;
  date: number | Date;
  id: number;
  recap: string;
  onclick: Function;
  isLiked?: boolean;
  likesCount?: number;
  commentsCount?: number;
}

export default memo(function CardSolution({ id, recap, author, date, onclick, isLiked, commentsCount }: ICardSolution) {

  return (
    <div className="cardSolution" onClick={(event) => {
      event.stopPropagation();
      onclick();
    }}>
      <div className="cardSolution__header">
        <Date date={date} />
        <BulletPoint />
        <Like showNumber={true} id={id} isAlreadyLiked={isLiked} type="Solution" />
        <BulletPoint />
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem' }}>
          <Svg id="comment" styles={{ width: "2rem", height: "2rem" }} />
          <p className="comment__count">{commentsCount}</p>
        </div>
      </div>
      <div className="cardSolution__profile">
        <ProfileButton id={author.id} username={`${author.firstName} ${author.lastName}`} />
      </div>
      <div className="cardSolution__content">
        <Paragraph color="dark" isHtml={true} styles={{ paddingBottom: '1rem' }}>
          {DOMPurify.sanitize(recap ?? "")}
        </Paragraph>
      </div>
    </div>
  );
});
