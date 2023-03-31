import { CSSProperties, MouseEventHandler } from "react";
import "./Dropdown.scss";

export interface IDropdown {
  options: Array<IDropdownOption>;
  component: JSX.Element;
  styles: CSSProperties;
}

export interface IDropdownOption {
  isActive?: boolean;
  component: JSX.Element;
  handleClick?: Function;
  value?: any;
}

export default function Dropdown({ options, component, styles }: IDropdown) {
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
}