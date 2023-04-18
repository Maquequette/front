import { ReactNode } from "react";
import Svg from "../Svg/Svg";
import { Theme } from "@/types/Theme";
import "./Folder.scss";

export interface IFolder {
  theme: Theme;
  children: ReactNode;
}

export default function Folder({ theme, children }: IFolder) {
  return (
    <div className={`folder folder--${theme}`}>
      <div className="folder__header">
        <Svg id="down" />
      </div>
      <div className="folder__body">{children}</div>
    </div>
  );
}
