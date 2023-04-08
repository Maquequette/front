import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Options from "@/components/01 - Atoms/Options/Options";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import { Theme } from "@/types/Theme";
import useClickOutside from "@/hooks/useClickOutside";
import "./Multiselect.scss";

export interface IMultiselect {
  options: ISelectOption[];
  theme: Theme;
  multiple?: boolean;
  searchable?: boolean;
}

export interface ISelectOption {
  value: string | number;
  label: string;
}

export default function Multiselect({
  options,
  theme,
  multiple = true,
  searchable = false,
}: IMultiselect) {

  const [selected, setSelected] = useState<Array<ISelectOption>>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const searchWriting = useMemo(() => {
    return isActive && searchable
  }, [isActive, searchable])

  const handleMultiselect = (option: ISelectOption) => {
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

  const handleSelect = (option: ISelectOption) => {
    setSelected([option]);
  }

  const closeDropdown = () => {
    setIsActive(false)
  }

  const ref = useClickOutside(closeDropdown);

  return (

    <div className="multiselect" ref={ref}>

      <div
        className="multiselect__input"
        onClick={() => {
          if (!searchWriting || (searchWriting && !searchQuery)) setIsActive(!isActive);
        }}
      >

        <div className="multiselect__input__selected">
          {!multiple
            ? <input
              type={searchWriting ? 'search' : 'text'}
              className="multiselect__input__text"
              readOnly={!searchWriting}
              value={searchWriting ? searchQuery : (selected[0]?.label ?? "Choose")}
              placeholder="Search something..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.target.value)
              }}
            />
            : (
              selected.length === 0
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
                })
            )
          }
        </div>

        <div className="multiselect__input__sprite">
          <Svg id="dropdown" />
        </div>

      </div>

      <div className="multiselect__dropdown">

        {isActive && (
          <div className="multiselect__dropdown__container">
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
              {options.filter((element: ISelectOption) => {
                return !searchQuery ? true : element.label.toLowerCase().includes(searchQuery.toLowerCase())
              }).map((element: ISelectOption) => {
                return (
                  <Options
                    isChecked={selected.includes(element)}
                    hasCheckbox={multiple}
                    key={element.value}
                    theme={theme}
                    label={element.label}
                    value={element.value}
                    classes={selected.includes(element) && !multiple ? 'active' : ''}
                    handleClick={() => {
                      multiple ? handleMultiselect(element) : handleSelect(element)
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
