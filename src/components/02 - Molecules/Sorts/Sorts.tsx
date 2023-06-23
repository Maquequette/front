import { ReactNode } from "react";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import Label from "@/components/01 - Atoms/Label/Label";
import Multiselect from "../Multiselect/Multiselect";
import "./Sorts.scss";

export interface ISorts {
  title: string;
  nbResult: number;
  children: ReactNode;
}

export default function ({ title, nbResult, children }: ISorts) {
  return (
    <div className="sorts">
      <Heading tag="h2" level="secondary">
        {title}
      </Heading>
      <div className="sorts__separator"></div>
      <div className="sorts__body">
        <p className="sorts__nb">{nbResult} Results</p>
        <div className="sorts__input">{children}</div>
      </div>
    </div>
  );
}
