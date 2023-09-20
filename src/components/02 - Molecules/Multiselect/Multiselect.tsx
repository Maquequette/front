import { useTranslation } from "react-i18next";
import { memo, useMemo, useState, useEffect, useCallback, type CSSProperties } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Options from "@/components/01 - Atoms/Options/Options";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import useClickOutside from "@/hooks/useClickOutside";
import { type Theme } from "@/types/Theme";
import "./Multiselect.scss";

export interface IMultiselect {
  options: ISelectOption[];
  theme: Theme;
  multiple?: boolean;
  searchable?: boolean;
  defaultText?: string;
  callback: (value: any) => void;
  styles?: CSSProperties;
}

export interface ISelectOption {
  id?: number | string;
  label: string;
  default?: boolean;
  children?: Array<ISelectOption>;
  orderBy?: string;
  order?: string;
}

const Multiselect = ({
  options,
  theme,
  multiple = true,
  searchable = false,
  defaultText = undefined,
  callback,
  styles
}: IMultiselect) => {
  const { t } = useTranslation();

  const defaultSelection = useMemo(() => {
    const defaultOption = options.find((option) => option.default);
    return defaultOption ? [defaultOption] : [];
  }, []);

  const [selected, setSelected] = useState<Array<ISelectOption>>(defaultSelection);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchWriting = useMemo(() => {
    return isActive && searchable;
  }, [isActive, searchable]);

  const handleMultiselect = useCallback(
    (option: ISelectOption) => {
      const index = selected.findIndex((opt) => {
        return opt.label === option.label;
      });

      if (index === -1) {
        setSelected([...selected, option]);
      } else {
        const nValue = [...selected];
        nValue.splice(index, 1);
        setSelected(nValue);
      }
    },
    [selected]
  );

  const handleSelect = useCallback((option: ISelectOption) => {
    setSelected([option]);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsActive(false);
  }, []);

  const ref = useClickOutside(closeDropdown);

  useEffect(() => {
    callback(selected);
  }, [selected]);

  return (
    <div className={`multiselect ${isActive ? "active" : ""}`} ref={ref}>
      <div
        className="multiselect__input"
        style={styles}
        onClick={(e) => {
          e.stopPropagation();
          if (searchable) {
            if (!searchWriting || (searchWriting && !searchQuery && !selected)) {
              setIsActive(!isActive);
            }
          } else {
            setIsActive(!isActive);
          }
        }}>
        <div className="multiselect__input__selected">
          {!multiple ? (
            <input
              type={searchWriting ? "search" : "text"}
              className="multiselect__input__text"
              readOnly={!searchWriting}
              value={
                selected.length > 0
                  ? selected[0]?.label
                  : searchWriting && searchQuery
                  ? searchQuery
                  : !isActive
                  ? defaultText ?? t("Choose")
                  : ""
              }
              placeholder="Search something..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.target.value);
                if (e.target.value === "") {
                  setSelected(defaultSelection);
                }
              }}
            />
          ) : selected.length === 0 ? (
            defaultText ?? t("Choose")
          ) : (
            selected.map((element: ISelectOption) => {
              return (
                <div
                  className="multiselect__input__selected__badge"
                  key={element.id + "_badge"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMultiselect(element);
                  }}>
                  {element.label}
                  <Svg id="cross" />
                </div>
              );
            })
          )}
        </div>

        <div
          className="multiselect__input__sprite"
          onClick={(e) => {
            e.stopPropagation();
            setIsActive(!isActive);
          }}>
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
              {options
                .filter((element: ISelectOption) => {
                  return !searchQuery
                    ? true
                    : element.label.toLowerCase().includes(searchQuery.toLowerCase());
                })
                .map((element: ISelectOption, index: number) => {
                  return (
                    <Options
                      isChecked={selected.includes(element)}
                      hasCheckbox={multiple}
                      key={index}
                      theme={theme}
                      label={element.label}
                      value={element.id}
                      classes={clsx(selected.includes(element) && !multiple ? "active" : "")}
                      handleClick={() => {
                        multiple ? handleMultiselect(element) : handleSelect(element);
                      }}>
                      {element.children
                        ?.filter((option: ISelectOption) => {
                          return !searchQuery
                            ? true
                            : option.label.toLowerCase().includes(searchQuery.toLowerCase());
                        })
                        .map((option: ISelectOption, index: number) => (
                          <Options
                            isChecked={selected.includes(option)}
                            hasCheckbox={multiple}
                            key={index}
                            theme={theme}
                            label={option.label}
                            value={option.id}
                            classes={clsx(selected.includes(option) && !multiple ? "active" : "")}
                            handleClick={() => {
                              multiple ? handleMultiselect(option) : handleSelect(option);
                            }}
                          />
                        ))}
                    </Options>
                  );
                })}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(Multiselect);
