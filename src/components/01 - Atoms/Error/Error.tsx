import { ReactNode, memo } from "react";
import "./Error.scss";

export interface IError {
  children: ReactNode;
}

export default memo(function Error({ children }: IError) {
  return <span className="error">{children}</span>;
});
