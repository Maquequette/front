import { ChangeEventHandler } from "react";
import { InputTypes } from "@/types/InputTypes";
import "./Input.scss";

export interface IInput {
  type: InputTypes;
  name: string;
  required: boolean;
  placeholder: string;
  autoComplete: string;
  handleOnChange: ChangeEventHandler;
  value: any;
}

export default function Input({
  type,
  name,
  placeholder,
  required,
  autoComplete,
  handleOnChange,
  value
}: IInput) {
  return (
    <input
      className={`input input--${type}`}
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value ?? undefined}
      onChange={handleOnChange ?? undefined}
    />
  );
}
