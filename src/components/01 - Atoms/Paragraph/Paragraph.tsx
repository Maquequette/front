import { ReactNode, memo } from "react";
import { Theme } from "@/types/Theme";
import "./Paragraph.scss";

export interface IParagraph {
  children: ReactNode;
  color?: Theme;
}

export default memo(function Paragraph({ children, color }: IParagraph) {
  return <p className={`paragraph  ${color && `txt--${color}`}`}>{children}</p>;
});
