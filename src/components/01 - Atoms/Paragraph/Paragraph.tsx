import { ReactNode } from "react";
import "./Paragraph.scss";

export interface IParagraph {
  children: ReactNode;
}

export default function Paragraph({ children }: IParagraph) {
  return <p className="paragraph">{children}</p>;
}
