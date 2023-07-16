import { ReactNode, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import "./Sorts.scss";

export interface ISorts {
  title: string;
  nbResult: number;
  children: ReactNode;
  actions?: ReactNode;
}

export default function ({ title, nbResult, children, actions }: ISorts) {
  return (
    <div className="sorts">
      {actions ? (
        actions
      ) : (
        <Heading tag="h2" level="secondary">
          {title}
        </Heading>
      )}

      <div className="sorts__separator"></div>
      <div className="sorts__body">
        <p className="sorts__nb">
          {nbResult} {nbResult > 1 ? "Results" : "Result"}
        </p>
        <div className="sorts__input">{children}</div>
      </div>
    </div>
  );
}
