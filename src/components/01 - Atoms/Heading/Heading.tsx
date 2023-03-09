import { CSSProperties } from "react";
import { HeadingTags } from "@/types/HeadingTags";
import { ReactNode } from "react";
import { Theme } from "@/types/Theme";
import "./Heading.scss";

export interface IHeading {
  tag: HeadingTags;
  children: ReactNode;
  type: Theme;
  styles?: CSSProperties;
}

export default function Heading({ tag, children, type }: IHeading) {
  const Tag = tag;
  return <Tag className={`heading heading--${type}`}>{children}</Tag>;
}
