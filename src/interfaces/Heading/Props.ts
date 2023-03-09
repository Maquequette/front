import { CSSProperties } from "react";
import { Tag } from "@/types/Heading/Tag";
import { Type } from "@/types/Heading/Type";
import { ReactNode } from "react";

export interface IHeadingProps {
  tag: Tag;
  children: ReactNode;
  type: Type;
  styles?: CSSProperties;
}
