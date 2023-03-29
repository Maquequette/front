import { Theme } from "@/types/Theme";
import "./Tag.scss";

export interface ITag {
  label: string;
  theme: Theme;
}
export default function Tag({ theme, label }: ITag) {
  return <div className={`tag tag--${theme}`}>{label}</div>;
}
