import { useState } from "react";
import { motion } from "framer-motion";
import Options from "@/components/01 - Atoms/Options/Options";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import { Theme } from "@/types/Theme";
import useClickOutside from "@/hooks/useClickOutside";
import "./Multiselect.scss";

export interface IMultiselect {
  options: ISelectOption[];
  theme: Theme;
}

export interface ISelectOption {
  value: any;
  label: string;
}

export default function Multiselect({ options, theme }: IMultiselect) {
  const [selected, setSelected] = useState<Array<ISelectOption>>([]);
  const [isActive, setIsActive] = useState(false);

  const handleSelect = (option: ISelectOption) => {
    const index = selected.findIndex((opt) => {
      return opt.value === option.value;
    });

    if (index === -1) {
      setSelected([...selected, option]);
    } else {
      const nValue = [...selected];
      nValue.splice(index, 1);
      setSelected(nValue);
    }
  };

  const closeDropdown = () => {
    setIsActive(false)
  }

  const ref = useClickOutside(closeDropdown);

  return (

    <div className="multiselect" ref={ref}>

      <div
        className="multiselect__input"
        onClick={() => {
          setIsActive(!isActive);
        }}
      >

        <div className="multiselect__input__selected">
          {selected.length === 0
            ? "Choose"
            : selected.map((element: ISelectOption) => {
              return (
                <div
                  className="multiselect__input__selected__badge"
                  key={element.value + "_badge"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(element);
                  }}>
                  {element.label}
                  <Svg id="cross" />
                </div>
              );
            })}
        </div>

        <div className="multiselect__input__sprite">
          <Svg id="dropdown" />
        </div>

      </div>

      <div className="multiselect__dropdown">

        {isActive && (
          <div className="full" style={{ marginBottom: '1rem' }}>
            <motion.div
              className="multiselect__dropdown__options"
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
                    isChecked={selected.includes(element)}
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
          </div>
        )}

      </div>
    </div>

  );
}
