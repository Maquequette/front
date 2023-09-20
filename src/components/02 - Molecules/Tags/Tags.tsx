import { memo } from "react";
import Tag, { type ITag } from "@/components/01 - Atoms/Tag/Tag";
import "./Tags.scss";

export interface ITags {
  tags?: Array<ITag>;
}

export default memo(function Tags({ tags }: ITags) {
  return (
    <div className="tags">
      <div className="tags__container">
        {tags?.map((tag) => {
          return <Tag key={tag.id} id={tag.id} label={tag.label} color={tag.color} />;
        })}
      </div>
    </div>
  );
});
