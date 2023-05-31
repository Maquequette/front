import { ReactNode, useState, memo } from "react";
import clsx from "clsx";
import useClickOutside from "@/hooks/useClickOutside";
import "./Badge.scss";

export interface IBadge {
  content?: string;
  children: ReactNode;
  id?: string;
  color: any;
}

export default memo(function Badge({ content, children, id, color }: IBadge) {
  const [visible, setVisibility] = useState<boolean>(false);
  const ref = useClickOutside(() => setVisibility(false));

  return (
    <div className="badge" id={id} ref={ref}>
      <button
        type="button"
        className={`badge__btn`}
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
