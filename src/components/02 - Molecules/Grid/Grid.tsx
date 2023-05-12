import { CSSProperties, ReactNode, memo } from "react";
import "./Grid.scss";

export interface IGrid {
  children: ReactNode;
  size: string;
  styles: CSSProperties;
}

export default memo(function Grid({ children, size, styles }: any) {
  return (
    <div className="grid" style={{ ...styles, "--size": size } as CSSProperties}>
      {children}
    </div>
  );
});
