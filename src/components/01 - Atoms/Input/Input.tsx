import { ChangeEventHandler, CSSProperties, HTMLInputTypeAttribute, useState } from "react";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import "./Input.scss";

export interface IInput {
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  styles?: CSSProperties;
  disabled?: boolean;
  required?: boolean;
  pattern?: string;
  autoComplete?: string;
  handleOnChange?: ChangeEventHandler<HTMLInputElement>;
  value: string | number;
}

export default function Input({
  type,
  name,
  placeholder,
  styles,
  disabled = false,
  required = false,
  pattern,
  autoComplete,
  handleOnChange,
  value
}: IInput) {
  const [readable, setReadable] = useState<boolean>(false);

  return (
    <div className="inputContainer" style={styles}>
      <input
        className={`inputContainer__input inputContainer__input--${type}`}
        type={type != "password" ? type : readable ? "text" : type}
        name={name}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        pattern={pattern}
        autoComplete={autoComplete}
        value={value ?? undefined}
        onChange={handleOnChange ?? undefined}
      />

      {type === "password" && (
        <button
          type="button"
          className="inputContainer__icon inputContainer__input--password"
          onClick={() => setReadable(!readable)}>
          <Svg id={readable ? "closedEye" : "eye"} />
        </button>
      )}
    </div>
  );
}
