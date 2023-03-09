import { IBtnProps } from "@/interfaces/Button/Props";
import "./Button.scss";

export default function Button({
  type,
  children,
  handleClick,
  theme,
  disabled,
  styles,
}: IBtnProps) {
  return (
    <div className={`btn btn--${theme}`} style={styles}>
      <button
        disabled={disabled ?? false}
        type={type ?? "button"}
        onClick={handleClick ?? undefined}
        className={`btn__input btn__input--${theme}`}
      >
        {children}
      </button>
    </div>
  );
}
