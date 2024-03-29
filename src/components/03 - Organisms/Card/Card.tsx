import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import Tags from "@/components/02 - Molecules/Tags/Tags";
import Paragraph from "@/components/01 - Atoms/Paragraph/Paragraph";
import Price from "@/components/01 - Atoms/Price/Price";
import Date from "@/components/01 - Atoms/Date/Date";
import Badge from "@/components/01 - Atoms/Badge/Badge";
import Image from "@/components/01 - Atoms/Image/Image";
import Like from "@/components/02 - Molecules/Like/Like";
import { type ITag } from "@/components/01 - Atoms/Tag/Tag";
import "./Card.scss";

export interface ICard {
  img?: string;
  title: string;
  tags?: Array<ITag>;
  author?: string;
  price?: PaymentCurrencyAmount;
  date?: number | Date;
  id: number;
  path?: string;
  desc?: string;
  badge?: any;
  isLiked?: boolean;
  likesCount?: number;
}

export default memo(function Card({
  id,
  img,
  title,
  tags,
  author,
  price,
  date,
  desc,
  path,
  badge,
  isLiked
}: ICard) {
  const color = useMemo(() => {
    return ["primary", "secondary", "warn", "danger", "success", "accent"];
  }, []);

  return (
    <div className="card" key={id}>
      <div className="card__header">
        <div className="card__media">
          <div
            className={`card__img${
              !img ? `--placeholder card__img--${color.sort(() => 0.5 - Math.random())[0]}` : ""
            }`}>
            {img && <Image src={img} alt={title} height="175" width="100%" />}
          </div>
          <div className="card__icons">
            {badge && (
              <Badge color={badge.color} content={badge.sortLevel}>
                {badge.label}
              </Badge>
            )}
            <div className="card__socials">
              <Like showNumber={false} id={id} isAlreadyLiked={isLiked}></Like>
            </div>
          </div>
        </div>
        <Link to={path ?? ""} className="card__title">
          <Heading tag="h4" level="tertiary">
            {title}
          </Heading>
        </Link>
      </div>
      {tags && <Tags tags={tags} />}
      <Link to={path ?? ""} className="card__body">
        <Paragraph color="dark" isHtml={true}>
          {DOMPurify.sanitize(desc ?? "")}
        </Paragraph>
      </Link>
      <div className="card__footer">
        <p className="card__info">
          {author && `${author} - `}
          {date && <Date date={date} />}
        </p>
        {price && <Price theme="success" type="outline" value={price} />}
      </div>
    </div>
  );
});
