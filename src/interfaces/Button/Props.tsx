import { Type } from "@/types/Button/Type";
import { Theme } from "@/types/Button/Theme";
import { MouseEventHandler, CSSProperties, ReactNode } from "react";

export interface IBtnProps {
  type?: Type;
  children: ReactNode;
  handleClick?: MouseEventHandler;
  theme: Theme;
  disabled?: boolean;
  styles?: CSSProperties;
}
