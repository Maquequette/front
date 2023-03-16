import { useState } from "react";
import { motion } from "framer-motion";
import Options from "@/components/01 - Atoms/Options/Options";
import { Theme } from "@/types/Theme";
import "./Multiselect.scss";

export interface IMultiselect {
  options: ISelectOption[];
  theme: Theme;
}

export interface ISelectOption {
  value: any;
  label: String;
}

export default function Multiselect({ options, theme }: IMultiselect) {
  const [selected, setSelected] = useState<Array<ISelectOption>>([]);
  const [value, setValue] = useState<Array<any>>([]);
  const [isActive, setIsActive] = useState(false);

  const handleSelect = (option: ISelectOption) => {
    const index = selected.findIndex((opt) => {
      return opt.value === option.value;
    });

    if (index === -1) {
      setSelected([...selected, option]);
      setValue([...value, option.value]);
    } else {
      setSelected(selected.slice(index, 1));
      setSelected(value.slice(index, 1));
    }
  };

  return (
    <div className="multiselect">
      <div
        className="multiselect__selected"
        onClick={() => {
          setIsActive(!isActive);
        }}>
        {selected.map((element: ISelectOption) => {
          return (
            <div className="multiselect__badge" key={element.value}>
              {element.label}
            </div>
          );
        })}
      </div>
      {isActive && (
        <motion.div
          className="multiselect__options"
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
          initial="hidden"
          animate="show">
          {options.map((element: ISelectOption) => {
            return (
              <Options
                hasCheckbox={true}
                key={element.value}
                theme={theme}
                label={element.label}
                value={element.value}
                handleClick={() => {
                  handleSelect(element);
                }}
              />
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
