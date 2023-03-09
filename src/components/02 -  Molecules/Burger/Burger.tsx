import Svg from "@/components/01 - Atoms/Svg/Svg";
import { MouseEventHandler } from "react";
import "./Burger.scss";

export default function Burger({
  handleClick,
}: {
  handleClick: MouseEventHandler;
}) {
  return (
    <button className="burger">
      <Svg id="burger" />
    </button>
  );
}
