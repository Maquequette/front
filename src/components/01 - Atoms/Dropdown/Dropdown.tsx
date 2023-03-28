import { MouseEventHandler } from "react";
import "./Dropdown.scss";

export interface IDropdown {
  options: Array<IDropdownOption>;
  component: JSX.Element;
}

export interface IDropdownOption {
  isActive: boolean;
  component: JSX.Element;
  handleClick: Function;
  value: any;
}

export default function Dropdown({ options, component }: IDropdown) {
  return (
    <div className="dropdown">
      {component}
      <div className="dropdown__options">
        {options.map((option) => {
          return (
            <div
              className={`dropdown__option ${option.isActive ? "active" : ""}`}
              onClick={() => option.handleClick(option.value)}>
              {option.component}
            </div>
          );
        })}
      </div>
    </div>
  );
}
