import { ReactNode } from "react";
import "./Paragraph.scss";
import { Theme } from "@/types/Theme";

export interface IParagraph {
  children: ReactNode;
  color?: Theme;
}

export default function Paragraph({ children, color }: IParagraph) {
  return <p className={`paragraph  ${color && `txt--${color}`}`}>{children}</p>;
}
