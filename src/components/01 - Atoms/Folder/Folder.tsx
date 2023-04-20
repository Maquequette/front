import { CSSProperties, ReactNode } from "react";
import Svg from "../Svg/Svg";
import { Theme } from "@/types/Theme";
import "./Folder.scss";

export interface IFolder {
  theme: Theme;
  children: ReactNode;
  styles?: CSSProperties;
  down: Theme;
}

export default function Folder({ theme, children, styles, down }: IFolder) {
  return (
    <div className={`folder folder--${theme}`} style={styles}>
      <div className={`folder__header down--${down}`}>
        <Svg id="down" />
      </div>
      <div className="folder__body">{children}</div>
    </div>
  );
}
