import { Theme } from "@/types/Theme";
import { MouseEventHandler } from "react";
import "./Checkbox.scss";

export interface ICheckbox {
  theme: Theme;
  value: any;
  isChecked: boolean;
  handleClick?: MouseEventHandler;
}

export default function Checkbox({ theme, value, handleClick, isChecked }: ICheckbox) {
  return (
    <div className="checkbox" onClick={() => handleClick?.(value)}>
      <input
        type="checkbox"
        className={`checkbox__input checkbox__input--${theme}`}
        checked={isChecked}
        readOnly
      />
    </div>
  );
}
