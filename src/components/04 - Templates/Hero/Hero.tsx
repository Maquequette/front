import { CSSProperties, ReactNode } from "react";

import "./Hero.scss";

export interface IHero {
  title: ReactNode;
  illustation: ReactNode;
  styles?: CSSProperties;
}

export default function Hero({ title, illustation, styles }: IHero) {
  return (
    <div className="hero" style={styles}>
      <div className="hero__info">{title}</div>
      <div className="hero__illustration">{illustation}</div>
    </div>
  );
}
