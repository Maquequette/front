import { CSSProperties, ReactNode } from "react";
import "./Grid.scss";

export interface IGrid {
  children: ReactNode;
  size: string;
}

export default function Grid({ children, size }: any) {
  return (
    <div className="grid" style={{ "--size": size } as CSSProperties}>
      {children}
    </div>
  );
}
