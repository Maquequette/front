import { type CSSProperties, type ReactNode, memo } from "react";
import { type Theme } from "@/types/Theme";
import "./Paragraph.scss";

export interface IParagraph {
  children: ReactNode | string | any;
  color?: Theme;
  isHtml?: boolean;
  styles?: CSSProperties;
}

export default memo(function Paragraph({ children, color, isHtml, styles }: IParagraph) {
  return isHtml ? (
    <div
      style={styles}
      className={`paragraph  ${color ? `txt--${color}` : ""}`}
      dangerouslySetInnerHTML={{ __html: children }}></div>
  ) : (
    <p className={`paragraph  ${color ? `txt--${color}` : ""}`} style={styles}>
      {children}
    </p>
  );
});
