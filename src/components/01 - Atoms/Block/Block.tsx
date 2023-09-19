import { CSSProperties, ReactNode, memo } from "react";
import "./Block.scss";
import { Theme } from "@/types/Theme";

export interface IBlock {
  children: ReactNode;
  withSquare?: boolean;
  styles?: CSSProperties;
}
export default memo(function Block({ children, withSquare = false, styles }: IBlock) {
  return (
    <div className="block" style={styles}>
      {withSquare && <div className="square"></div>}
      <span>{children}</span>
    </div>
  );
});
