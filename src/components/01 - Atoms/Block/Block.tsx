import { ReactNode, memo } from "react";
import "./Block.scss";

export interface IBlock {
  children: ReactNode;
}
export default memo(function Block({ children }: IBlock) {
  return <span className="block">{children}</span>;
});
