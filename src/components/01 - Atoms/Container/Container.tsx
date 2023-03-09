import { ReactNode, CSSProperties } from "react";
import "./Container.scss";

export default function Container({
  children,
  center,
  styles,
  classes,
}: {
  children: ReactNode;
  center?: Boolean;
  styles?: CSSProperties;
  classes?: String;
}) {
  return (
    <div
      className={`container ${center ? "container--centered" : ""} ${classes}`}
    >
      {children}
    </div>
  );
}
