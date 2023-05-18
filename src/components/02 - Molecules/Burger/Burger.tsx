import { MouseEventHandler, memo } from "react";
import "./Burger.scss";

export default memo(function Burger({
  handleClick,
  isOpen
}: {
  handleClick: MouseEventHandler;
  isOpen: boolean;
}) {
  return (
    <button className={`burger ${isOpen ? "burger--open" : ""}`} onClick={handleClick}>
      <svg fill="var(--dark)" className="burger__icon" viewBox="0 0 100 100">
        <rect
          className="burger__line burger__top"
          width="80"
          height="7"
          x="20"
          y="25"
          rx="5"></rect>
        <rect
          className="burger__line burger__middle"
          width="90"
          height="7"
          x="10"
          y="45"
          rx="5"></rect>
        <rect
          className="burger__line burger__bottom"
          width="80"
          height="7"
          x="20"
          y="65"
          rx="5"></rect>
      </svg>
    </button>
  );
});
