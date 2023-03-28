import { ReactNode, CSSProperties } from "react";
import "./Container.scss";

export interface IContainer {
  children: ReactNode;
  center?: boolean;
  disabled?: boolean;
  styles?: CSSProperties;
}

export default function Container({ children, center, styles }: IContainer) {
  return (
    <div style={styles} className={`container ${center ? "container--centered" : ""}`}>
      {children}
    </div>
  );
}
