import { ReactNode } from "react";
import "./Error.scss";

export interface IError {
  children: ReactNode;
}

export default function Error({ children }: IError) {
  return <p className="error">{children}</p>;
}
