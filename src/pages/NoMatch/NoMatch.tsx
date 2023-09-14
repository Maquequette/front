import { Player } from "@lottiefiles/react-lottie-player";
import Mac from "@/assets/images/Mac.json";
import "./NoMatch.scss";

export default function NoMatch(): JSX.Element {
  return (
    <div className="noMatch">
      <Player src={Mac} autoplay loop />
    </div>
  );
}
