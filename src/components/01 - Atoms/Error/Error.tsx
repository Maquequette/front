import { ReactNode } from "react";
import "./Error.scss";

export interface IError {
  children: ReactNode;
}

export default function Error({ children }: IError) {
  return <span className="error">{children}</span>;
}
