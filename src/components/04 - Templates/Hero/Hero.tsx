import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import gwen from "../../../assets/gwen.json";
import "./Hero.scss";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__info">
        <Heading tag="h1" level="primary">
          LEARN FRONT-END / WEB DESIGN THE COOL WAY
        </Heading>
      </div>
      <div className="hero__illustration">
        <Player src={gwen} autoplay keepLastFrame />
      </div>
    </div>
  );
}
