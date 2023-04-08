import { CSSProperties } from "react";
import "./Svg.scss";

export interface ISvg {
  id: string;
  styles?: CSSProperties;
  preserveAspectRatio?: string;
}

export default function Svg({ id, styles, preserveAspectRatio }: ISvg) {
  return (
    <svg className="sprites" style={styles} preserveAspectRatio={preserveAspectRatio}>
      <use xlinkHref={`./sprites.svg#${id}`}></use>
    </svg>
  );
}
