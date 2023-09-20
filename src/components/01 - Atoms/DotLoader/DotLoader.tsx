/* eslint-disable react/display-name */
import { type Theme } from "@/types/Theme";
import { type RefObject, forwardRef, memo } from "react";
import "./DotLoader.scss";

const DotLoader = forwardRef(({ theme }: { theme: Theme }, ref) => {
  return (
    <div className={`dotLoader dotLoader--${theme}`} ref={ref as RefObject<HTMLInputElement>}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
});

export default memo(DotLoader);
