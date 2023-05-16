import { CSSProperties, memo } from "react";
import { HeadingTags } from "@/types/HeadingTags";
import { ReactNode } from "react";
import { Levels } from "@/types/Levels";
import { Theme } from "@/types/Theme";
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
    <Tag style={styles} className={`heading heading--${level} ${color && `txt--${color}`}`}>
      {children}
    </Tag>
  );
});
