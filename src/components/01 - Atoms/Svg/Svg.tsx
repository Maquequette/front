import "./Svg.scss";

export default function Svg({ id }: { id: string }) {
  return (
    <svg className="sprites">
      <use xlinkHref={`./sprites.svg#${id}`}></use>
    </svg>
  );
}
