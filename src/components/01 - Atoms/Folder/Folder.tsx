import Svg from "../Svg/Svg";
import { Theme } from "@/types/Theme";
import "./Folder.scss";

export interface IFolder {
  theme: Theme;
}

export default function Folder({ theme }: IFolder) {
  return (
    <div className={`folder folder--${theme}`}>
      <div className="encoche"></div>
      {/* <div className="folder__header">
        <div className="folder__down">
          <Svg id="down" />
        </div>
      </div>
      <div className="folder__body"></div> */}
    </div>
  );
}
