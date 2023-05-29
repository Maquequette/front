import { memo } from "react";
import "./Tag.scss";

export interface ITag {
  id: number;
  label: string;
  color: any;
}
export default memo(function Tag({ color, label }: ITag) {
  return (
    <div className="tag" style={{ color: `${color?.code}` }}>
      {label}
    </div>
  );
});
