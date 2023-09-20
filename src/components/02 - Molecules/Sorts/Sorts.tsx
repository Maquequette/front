import { type CSSProperties, type ReactNode, useContext } from "react";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import { BulletPoint } from "@/components/01 - Atoms/BulletPoint/BulletPoint";
import "./Sorts.scss";

export interface ISorts {
  title: string;
  nbResult?: number;
  displayResult?: boolean;
  children: ReactNode;
  actions?: ReactNode;
  styles?: CSSProperties;
}

export default function Sorts({
  title,
  nbResult = 0,
  displayResult = true,
  children,
  actions,
  styles
}: ISorts) {
  return (
    <div className="sorts" style={styles}>
      {actions ?? (
        <Heading tag="h2" level="secondary">
          {title}
        </Heading>
      )}

      <div className="sorts__separator"></div>
      <div className="sorts__body">
        {displayResult && (
          <p className="sorts__nb">
            {nbResult} {nbResult > 1 ? "Results" : "Result"}
          </p>
        )}
        {displayResult && children && <BulletPoint />}
        <div className="sorts__input">{children}</div>
      </div>
    </div>
  );
}
