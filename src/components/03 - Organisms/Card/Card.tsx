import Heading from "@/components/01 - Atoms/Heading/Heading";
import Tags from "@/components/02 -  Molecules/Tags/Tags";
import Paragraph from "@/components/01 - Atoms/Paragraph/Paragraph";
import Price from "@/components/01 - Atoms/Price/Price";
import Date from "@/components/01 - Atoms/Date/Date";
import { ITag } from "@/components/01 - Atoms/Tag/Tag";
import "./Card.scss";

export interface ICard {
  img: string;
  title: string;
  tags?: Array<ITag>;
  author?: string;
  price?: PaymentCurrencyAmount;
  date?: number;
}

export default function Card({ img, title, tags, author, price, date }: ICard) {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__img">
          <img src={img} alt={title} />
        </div>
        <div className="card__title">
          <Heading tag="h4" level="tertiary">
            {title}
          </Heading>
        </div>
      </div>
      {tags && <Tags tags={tags} />}
      <div className="card__body">
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat [...]
        </Paragraph>
      </div>
      <div className="card__footer">
        <p className="card__info">
          {author && `${author} -`}
          {date && <Date date={date} />}
        </p>
        {price && <Price theme="success" type="outline" value={price} />}
      </div>
    </div>
  );
}
