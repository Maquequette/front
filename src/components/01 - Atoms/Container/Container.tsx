import { ReactNode, CSSProperties } from "react";
import "./Container.scss";

export interface IContainer {
  children: ReactNode;
  center?: Boolean;
  disabled?: boolean;
  styles?: CSSProperties;
  classes?: String;
}

export default function Container({ children, center, styles, classes }: IContainer) {
  return (
    <div style={styles} className={`container ${center ? "container--centered" : ""} ${classes}`}>
      {children}
    </div>
  );
}
