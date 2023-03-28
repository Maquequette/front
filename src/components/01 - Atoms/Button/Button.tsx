import { MouseEventHandler, CSSProperties, ReactNode } from "react";
import { BtnTypes } from "@/types/BtnTypes";
import { Theme } from "@/types/Theme";
import "./Button.scss";

export interface IButton {
  type?: BtnTypes;
  children: ReactNode;
  handleClick?: MouseEventHandler;
  theme: Theme;
  disabled?: boolean;
  styles?: CSSProperties;
}

export default function Button({ type, children, handleClick, theme, disabled, styles }: IButton) {
  return (
    <div className={`btn btn--${theme}`} style={styles}>
      <button
        disabled={disabled ?? false}
        type={type ?? "button"}
        onClick={handleClick ?? undefined}
        className={`btn__input btn__input--${theme}`}>
        {children}
      </button>
    </div>
  );
}
