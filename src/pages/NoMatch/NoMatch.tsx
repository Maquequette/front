import { Player } from "@lottiefiles/react-lottie-player";
import PageTransition from "@/components/04 - Templates/PageTransition/PageTransition";

import Mac from "@/assets/images/Mac.json";
import "./NoMatch.scss";

export default function NoMatch(): JSX.Element {
  return (
    <PageTransition>
      <div className="noMatch">
        <Player src={Mac} autoplay loop />
      </div>
    </PageTransition>
  );
}
