import { type CSSProperties, memo, type ReactNode } from "react";
import { type HeadingTags } from "@/types/HeadingTags";
import { type Levels } from "@/types/Levels";
import { type Theme } from "@/types/Theme";
import "./Heading.scss";

export interface IHeading {
  tag: HeadingTags;
  children: ReactNode;
  level: Levels;
  styles?: CSSProperties;
  color?: Theme;
}

export default memo(function Heading({ tag, children, level, color, styles }: IHeading) {
  const Tag = tag;
  return (
    <Tag style={styles} className={`heading heading--${level} ${color ? `txt--${color}` : ""}`}>
      {children}
    </Tag>
  );
});
