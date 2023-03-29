import { ReactNode, CSSProperties } from "react";
import "./Container.scss";

export interface IContainer {
  children: ReactNode;
  center?: boolean;
  disabled?: boolean;
  styles?: CSSProperties;
  classes?: string;
}

export default function Container({ children, center, styles, classes }: IContainer) {
  return (
    <div
      style={styles}
      className={`container ${center ? "container--centered" : ""} ${classes ?? ""}`}>
      {children}
    </div>
  );
}
