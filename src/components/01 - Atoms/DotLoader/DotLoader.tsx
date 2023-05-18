import { Theme } from "@/types/Theme";
import "./DotLoader.scss";

export default function DotLoader({ theme }: { theme: Theme }) {
  return (
    <div className={`dotLoader dotLoader--${theme}`}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
