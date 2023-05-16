import { ReactNode, CSSProperties, memo } from "react";
import "./Container.scss";

export interface IContainer {
  children: ReactNode;
  center?: boolean;
  disabled?: boolean;
  styles?: CSSProperties;
  classes?: string;
  isLarge?: boolean;
}

export default memo(function Container({ children, center, styles, classes, isLarge }: IContainer) {
  return (
    <div
      style={styles}
      className={`container ${center ? "container--centered" : ""} ${classes ?? ""} ${
        isLarge ? "container--xl" : ""
      }`}>
      {children}
    </div>
  );
});
