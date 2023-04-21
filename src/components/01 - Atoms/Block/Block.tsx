import { ReactNode } from "react";
import "./Block.scss";

export interface IBlock {
  children: ReactNode;
}
export default function Block({ children }: IBlock) {
  return <span className="block">{children}</span>;
}
