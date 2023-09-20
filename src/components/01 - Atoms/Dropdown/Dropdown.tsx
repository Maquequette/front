import { type CSSProperties, memo } from "react";
import "./Dropdown.scss";

export interface IDropdown {
  options: IDropdownOption[];
  component: JSX.Element;
  styles: CSSProperties;
}

export interface IDropdownOption {
  isActive?: boolean;
  component: JSX.Element;
  handleClick?: (opt: any) => void;
  value?: any;
}

export default memo(function Dropdown({ options, component, styles }: IDropdown) {
  return (
    <div className="dropdown" style={styles}>
      {component}
      <div className="dropdown__options">
        {options.map((option) => {
          return (
            <div
              key={crypto.randomUUID()}
              className={`dropdown__option ${option.isActive ? "active" : ""}`}
              onClick={() => option.handleClick?.(option.value)}>
              {option.component}
            </div>
          );
        })}
      </div>
    </div>
  );
});
