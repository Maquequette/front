import { IHeadingProps } from "@/interfaces/Heading/Props";
import "./Heading.scss";

export default function Heading({ tag, children, type }: IHeadingProps) {
  const Tag = tag;
  return <Tag className={`heading heading--${type}`}>{children}</Tag>;
}
