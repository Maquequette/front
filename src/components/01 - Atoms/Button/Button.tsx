import { type MouseEventHandler, type CSSProperties, type ReactNode, memo } from "react";
import { type BtnTypes } from "@/types/BtnTypes";
import { type Theme } from "@/types/Theme";
import "./Button.scss";

export interface IButton {
  type?: BtnTypes;
  children: ReactNode;
  handleClick?: MouseEventHandler;
  theme: Theme;
  disabled?: boolean;
  styles?: CSSProperties;
  btnStyles?: CSSProperties;
  HTMLTag?: string;
}

export default memo(function Button({
  type,
  children,
  handleClick,
  theme,
  disabled,
  styles,
  btnStyles,
  HTMLTag = "button"
}: IButton) {
  return (
    <div className={`btn btn--${theme}`} style={styles}>
      {HTMLTag === "button" ? (
        <button
          disabled={disabled ?? false}
          type={type ?? "button"}
          onClick={handleClick ?? undefined}
          className={`btn__input btn__input--${theme}`}
          style={btnStyles}>
          {children}
        </button>
      ) : (
        <p
          onClick={handleClick ?? undefined}
          className={`btn__input btn__input--${theme}`}
          style={btnStyles}>
          {children}
        </p>
      )}
    </div>
  );
});
