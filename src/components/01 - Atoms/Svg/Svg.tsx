import { CSSProperties } from "react"
import "./Svg.scss"

export interface ISvg {
  id: string
  styles?: CSSProperties
}

export default function Svg({ id, styles }: ISvg) {
  return (
    <svg className="sprites" style={styles}>
      <use xlinkHref={`./sprites.svg#${id}`}></use>
    </svg>
  );
}
