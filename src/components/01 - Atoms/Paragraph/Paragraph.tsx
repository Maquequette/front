import { ReactNode, memo } from "react";
import { Theme } from "@/types/Theme";
import "./Paragraph.scss";

export interface IParagraph {
  children: ReactNode | string;
  color?: Theme;
  isHtml?: boolean;
}

export default memo(function Paragraph({ children, color, isHtml = false }: IParagraph) {
  return isHtml ? (
    <div
      className={`paragraph  ${color && `txt--${color}`}`}
      dangerouslySetInnerHTML={{ __html: children }}></div>
  ) : (
    <p className={`paragraph  ${color && `txt--${color}`}`}>{children}</p>
  );
});
