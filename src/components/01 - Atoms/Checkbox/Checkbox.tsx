import { CSSProperties, MouseEventHandler, memo } from "react";
import { Theme } from "@/types/Theme";
import "./Checkbox.scss";

export interface ICheckbox {
  name: string;
  theme: Theme;
  value: any;
  isChecked: boolean;
  handleClick?: MouseEventHandler;
  style?: CSSProperties;
}

export default memo(function Checkbox({
  name,
  theme,
  value,
  handleClick,
  isChecked,
  style
}: ICheckbox) {
  return (
    <div className="checkbox" style={style} onClick={() => handleClick?.(value)}>
      <input
        type="checkbox"
        name={name}
        className={`checkbox__input checkbox__input--${theme}`}
        id={name}
        checked={isChecked}
        readOnly
      />
    </div>
  );
});
