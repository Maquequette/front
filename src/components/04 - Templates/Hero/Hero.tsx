import { ReactNode } from "react";

import "./Hero.scss";

export interface IHero {
  title: ReactNode;
  illustation: ReactNode;
}

export default function Hero({ title, illustation }: IHero) {
  return (
    <div className="hero">
      <div className="hero__info">{title}</div>
      <div className="hero__illustration">{illustation}</div>
    </div>
  );
}
