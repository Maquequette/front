import { MouseEventHandler, useState } from "react";
import { motion } from "framer-motion";
import Svg from "../Svg/Svg";
import Options from "../Options/Options";
import "./Select.scss";

import { ISelectOption } from "@/components/03 - Organisms/Multiselect/Multiselect";
import { Theme } from "@/types/Theme";

export interface ISelect {
  options: Array<ISelectOption>;
  handleClick: MouseEventHandler;
  theme: Theme;
}

export default function Select({ options, handleClick, theme }: ISelect) {
  const [value, setValue] = useState<any>(null);
  const [isActive, setIsActive] = useState<Boolean>(false);

  const handleChange = (option: ISelectOption | null) => {
    setValue(option?.value);
    handleClick(option?.value);
  };

  return (
    <div className="select" style={{ marginTop: "3rem" }} onClick={() => setIsActive(!isActive)}>
      <div className="select__input">
        <input type="text" className="select__text" readOnly value={value?.label ?? "Choose"} />
        <Svg id="dropdown" />
      </div>

      {isActive && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -100 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="select__options"
          initial="hidden"
          animate="show">
          {options.map((option) => {
            return (
              <Options
                hasCheckbox={false}
                theme={theme}
                handleClick={() => handleChange(option)}
                value={option.value}
                label={option.label}></Options>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
