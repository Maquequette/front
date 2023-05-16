import { memo } from "react";
import { Theme } from "@/types/Theme";
import "./Spinner.scss";

export default memo(function Loading({ theme }: { theme: Theme }) {
  return <span className={`spinner spinner--${theme}`}></span>;
});
