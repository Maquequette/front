import Tag from "@/components/01 - Atoms/Tag/Tag";
import { ITag } from "@/components/01 - Atoms/Tag/Tag";
import "./Tags.scss";

export interface ITags {
  tags: Array<ITag>;
}

export default function Tags({ tags }: { tags: Array<ITag> }) {
  return (
    <div className="tags">
      <div className="tags__container">
        {tags.map((tag) => {
          return <Tag key={tag.label} label={tag.label} theme={tag.theme} />;
        })}
      </div>
    </div>
  );
}
