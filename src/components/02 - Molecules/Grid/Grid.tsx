import { type CSSProperties, type ReactNode, memo } from "react";
import "./Grid.scss";

export interface IGrid {
  children: ReactNode;
  size: string;
  styles?: CSSProperties;
}

export default memo(function Grid({ children, size, styles }: IGrid) {
  return (
    // @ts-ignore
    <div className="grid" style={{ ...styles, "--size": size } satisfies CSSProperties}>
      {children}
    </div>
  );
});
