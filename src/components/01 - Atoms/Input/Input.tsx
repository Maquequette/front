import { ChangeEventHandler, CSSProperties, HTMLInputTypeAttribute, useState, memo } from "react";
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
  value?: string | number;
  accept?: string;
  icon?: string;
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
  icon,
  multiple,
  limite,
  preview
}: IInput) {
  const [readable, setReadable] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<File>>([]);

  return (
    <>
      <label className="input--container" style={styles}>
        {icon && <Svg id={icon} />}
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
            handleOnChange && handleOnChange(e);
            const nfiles = e.target.files ? Array.from(e.target.files) : [];
            limite && nfiles?.length < limite
              ? setFiles(nfiles)
              : nfiles?.length && setFiles(nfiles);
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
      </label>
      {files && preview && (
        <div className="input__preview">
          {files.map((file) => {
            return (
              <div className="preview">
                <img src={URL.createObjectURL(file)} alt="" />
              </div>
            );
          })}
          {limite &&
            files.length - limite > 0 &&
            Array.from({ length: files.length - limite }).map((el) => {
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
