import { CSSProperties, ReactNode, memo } from "react";
import "./Label.scss";

export interface ILabel {
  name: string;
  children: ReactNode;
  className?: string;
  classes?: string;
  required?: boolean;
  styles?: CSSProperties;
  tooltip?: ReactNode;
  error?: ReactNode;
}

export default memo(function Label({
  name,
  children,
  className = "",
  classes = "",
  required = false,
  styles,
  tooltip,
  error
}: ILabel) {
  return (
    <div className={`label ${className}`} style={styles}>
      <label className={`label__label ${classes}`} htmlFor={name}>
        {children}

        {required && <span className="label__label__span">*</span>}

        {error && (
          <>
            <br />
            {error}
          </>
        )}
      </label>

      {tooltip}
    </div>
  );
});
