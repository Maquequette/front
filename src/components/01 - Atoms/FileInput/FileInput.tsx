import { type ChangeEventHandler, type CSSProperties, useState, memo } from "react";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import useToasts from "@/hooks/useToasts";
import "../Input/Input.scss";
import Button from "../Button/Button";
import DOMPurify from "dompurify";

export interface IFileInput {
  name: string;
  placeholder?: string;
  styles?: CSSProperties;
  disabled?: boolean;
  required?: boolean;
  handleOnChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  accept?: string;
  multiple?: boolean;
  limite?: number;
  preview?: boolean;
  icon?: string;
  instruction?: string;
}

export default memo(function FileInput({
  name,
  placeholder,
  styles,
  disabled = false,
  required = false,
  handleOnChange,
  value,
  accept,
  multiple,
  limite,
  preview,
  icon,
  instruction
}: IFileInput) {
  const [files, setFiles] = useState<File[]>([]);
  const { pushToast } = useToasts();
  return (
    <>
      <label className="input__container" style={styles}>
        <input
          className={`input__input input__input--file`}
          type="file"
          name={name}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          value={value ?? undefined}
          accept={accept}
          hidden={true}
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

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button theme="dark" HTMLTag="p">
            {icon && <Svg id={icon} />}
            {placeholder}
          </Button>
          {instruction && (
            <p
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                color: "#8a8a8a",
                fontSize: "1.2rem",
                whiteSpace: "pre"
              }}>
              {instruction}
            </p>
          )}
        </div>
      </label>
      {files && preview && (
        <div className="input__preview">
          {files.map((file, index) => {
            return (
              <div className="preview" key={index}>
                <img src={DOMPurify.sanitize(URL.createObjectURL(file))} alt="" />
              </div>
            );
          })}
          {limite &&
            files.length - limite > 0 &&
            Array.from({ length: limite - files.length }).map((el, index) => {
              return (
                <div className="preview" key={index}>
                  <Svg id="img" />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
});
