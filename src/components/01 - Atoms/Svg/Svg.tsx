import { CSSProperties, memo } from "react";
import Sprites from "../../../assets/images/sprites.svg";
import "./Svg.scss";

export interface ISvg {
  id: string;
  styles?: CSSProperties;
}

export default memo(function Svg({ id, styles }: ISvg) {
  return (
    <svg className="sprites" style={styles}>
      <use xlinkHref={`${Sprites}#${id}`}></use>
    </svg>
  );
});
