import "./Svg.scss";
export interface ISvg {
  id: string;
}

export default function Svg({ id }: ISvg) {
  return (
    <svg className="sprites">
      <use xlinkHref={`./sprites.svg#${id}`}></use>
    </svg>
  );
}
