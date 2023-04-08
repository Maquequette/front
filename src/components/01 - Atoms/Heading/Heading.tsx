import { CSSProperties } from "react";
import { HeadingTags } from "@/types/HeadingTags";
import { ReactNode } from "react";
import { Levels } from "@/types/Levels";
import "./Heading.scss";

export interface IHeading {
  tag: HeadingTags;
  children: ReactNode;
  level: Levels;
  styles?: CSSProperties;
}

export default function Heading({ tag, children, level }: IHeading) {
  const Tag = tag;
  return <Tag className={`heading heading--${level}`}>{children}</Tag>;
}
