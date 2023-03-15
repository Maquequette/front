import { useState } from "react";
import { motion } from "framer-motion";
import Svg from "../Svg/Svg";
import "./Select.scss";

export interface ISelect {
  options: Array<IOption>;
}

export interface IOption {
  label: string;
  value: string;
}

export default function Select({ options }: { options: Array<IOption> }) {
  const [value, setValue] = useState<IOption | null>(null);
  const [isActive, setIsActive] = useState<Boolean>(false);

  const handleChange = (option: IOption | null) => {
    setValue(option);
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
          <motion.div
            onClick={() => {
              handleChange(null);
            }}
            className="select__option"
            variants={{
              hidden: { opacity: 0, x: -100 },
              show: { opacity: 1, x: 0 }
            }}
          />
          {options.map((option) => {
            return (
              <motion.div
                onClick={() => {
                  handleChange(option);
                }}
                className="select__option"
                variants={{
                  hidden: { opacity: 0, x: -100 },
                  show: { opacity: 1, x: 0 }
                }}
                key={option.value}>
                {option.label}
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
