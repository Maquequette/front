import { ReactNode } from "react";

export interface IParagraph {
  children: ReactNode;
}

export default function Paragraph({ children }: IParagraph) {
  return <p className="paragraph">{children}</p>;
}
