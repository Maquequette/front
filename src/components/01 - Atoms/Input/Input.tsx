import { ChangeEventHandler, CSSProperties, HTMLInputTypeAttribute, useState, memo } from "react";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import useToasts from "@/hooks/useToasts";
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
  value?: string | number;
  accept?: string;
  leftIcon?: string;
  rightIcon?: string;
  multiple?: boolean;
  limite?: number;
  preview?: boolean;
}

export default memo(function Input({
  type,
  name,
  placeholder,
  styles,
  disabled = false,
  required = false,
  pattern,
  autoComplete,
  handleOnChange,
  value,
  accept,
  leftIcon,
  multiple,
  limite,
  preview,
  rightIcon
}: IInput) {
  const [readable, setReadable] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<File>>([]);
  const { pushToast } = useToasts();

  return (
    <>
      <label className="input__container" style={styles}>
        {leftIcon && <Svg id={leftIcon} />}
        <input
          className={`input__input input__input--${type}`}
          type={type != "password" ? type : readable ? "text" : type}
          name={name}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          pattern={pattern}
          autoComplete={autoComplete}
          value={value ?? undefined}
          accept={accept}
          hidden={type === "file"}
          multiple={multiple}
          onChange={(e) => {
            const nfiles = e.target.files ? Array.from(e.target.files) : [];
            if (limite) {
              if (nfiles.length > limite) {
                pushToast({
                  title: `Maximum files is ${limite}`,
                  theme: "danger",
                  desc: "Retry"
                });
              } else {
                setFiles(nfiles);
                handleOnChange && handleOnChange(e);
              }
            } else {
              handleOnChange && handleOnChange(e);
            }
          }}
        />
        {type === "file" && <p className="input__btn">Upload file</p>}

        {type === "password" && (
          <button
            type="button"
            className="input__icon input__input--password"
            onClick={() => setReadable(!readable)}>
            <Svg id={readable ? "closedEye" : "eye"} />
          </button>
        )}
        {rightIcon && <Svg id={rightIcon} />}
      </label>
      {files && preview && (
        <div className="input__preview">
          {files.map((file, index) => {
            return (
              <div className="preview" key={index}>
                <img src={URL.createObjectURL(file)} alt="" />
              </div>
            );
          })}
          {limite &&
            files.length - limite > 0 &&
            Array.from({ length: limite - files.length }).map((el) => {
              return (
                <div className="preview">
                  <Svg id="img" />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
});
