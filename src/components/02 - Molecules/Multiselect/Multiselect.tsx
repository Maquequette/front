import { memo, forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Options from "@/components/01 - Atoms/Options/Options";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import { Theme } from "@/types/Theme";
import useClickOutside from "@/hooks/useClickOutside";
import "./Multiselect.scss";
import clsx from "clsx";

export interface IMultiselect {
  options: ISelectOption[];
  theme: Theme;
  multiple?: boolean;
  searchable?: boolean;
  defaultText?: string;
  className?: string;
}

export interface ISelectOption {
  value: string | number | null;
  label: string;
  default?: boolean;
  children?: Array<ISelectOption>;
}

const Multiselect = forwardRef(({
  options,
  theme,
  multiple = true,
  searchable = false,
  defaultText = null!,
  className = '',
}: IMultiselect, _ref) => {

  const defaultSelection = (): Array<ISelectOption> => {
    let defaultOption = options.find(option => option.default)
    return defaultOption ? [defaultOption] : []
  }

  const [selected, setSelected] = useState<Array<ISelectOption>>(defaultSelection);
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

  useImperativeHandle(_ref, () => ({
    getSelected: () => {
      return selected;
    }
  }))

  const ref = useClickOutside(closeDropdown);

  return (

    <div className={`multiselect ${className} ${isActive ? 'active' : ''}`} ref={ref}>

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
              value={searchWriting ? searchQuery : (selected[0]?.label ?? (defaultText ?? "Choose"))}
              placeholder="Search something..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.target.value)
              }}
            />
            : (
              selected.length === 0
                ? (defaultText ?? "Choose")
                : selected.map((element: ISelectOption) => {
                  return (
                    <div
                      className="multiselect__input__selected__badge"
                      key={element.value + "_badge"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMultiselect(element);
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
              }).map((element: ISelectOption, index: number) => {

                return (
                  <Options
                    isChecked={selected.includes(element)}
                    hasCheckbox={multiple}
                    key={index}
                    theme={theme}
                    label={element.label}
                    value={element.value!}
                    classes={clsx(selected.includes(element) && !multiple ? 'active' : '')}
                    handleClick={() => {
                      multiple ? handleMultiselect(element) : handleSelect(element)
                    }}
                  >

                    {element.children?.filter((option: ISelectOption) => {
                      return !searchQuery ? true : option.label.toLowerCase().includes(searchQuery.toLowerCase())
                    }).map((option: ISelectOption, index: number) =>

                      <Options
                        isChecked={selected.includes(option)}
                        hasCheckbox={multiple}
                        key={index}
                        theme={theme}
                        label={option.label}
                        value={option.value!}
                        classes={clsx(selected.includes(option) && !multiple ? 'active' : '')}
                        handleClick={() => {
                          multiple ? handleMultiselect(option) : handleSelect(option)
                        }}
                      />
                    )}

                  </Options>
                );
              })}
            </motion.div>
          </div>
        )}

      </div>
    </div>

  );
})


export default memo(Multiselect)