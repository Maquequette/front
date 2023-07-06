import { ReactNode, useState, memo } from "react";
import clsx from "clsx";
import useClickOutside from "@/hooks/useClickOutside";
import "./Badge.scss";
import { Theme } from "@/types/Theme";

export interface IBadge {
  content?: string;
  children: ReactNode;
  id?: string;
  color?: any;
  theme?: Theme;
}

export default memo(function Badge({ content, children, id, color, theme }: IBadge) {
  const [visible, setVisibility] = useState<boolean>(false);
  const ref = useClickOutside(() => setVisibility(false));

  return (
    <div className="badge" id={id} ref={ref}>
      <button
        type="button"
        className={`badge__btn ${theme ? "badge__btn--" + theme : ""}`}
        style={{ backgroundColor: `${color?.code}` }}
        onClick={() => setVisibility(!visible)}>
        {content}
      </button>

      <div role="badge" className={clsx("badge__popup", visible && "active")}>
        {children}
      </div>
    </div>
  );
});
