import { ReactNode, memo } from "react";
import { Theme } from "@/types/Theme";
import "./Stipe.scss";

export interface IStripe {
  children: ReactNode;
  theme: Theme;
}

export default memo(function Stripe({ children, theme }: IStripe) {
  return (
    <span className={`strip strip--${theme}`}>
      <span className="strip__container">{children}</span>
    </span>
  );
});
