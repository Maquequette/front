import { ReactNode, useState, Children } from "react";
import "./Multiselect.scss";

export default function Multiselect({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<ReactNode[]>([]);
  const [isActive, setIsActive] = useState(false);

  const handleSelect = (option: ReactNode) => {
    console.log(option);
    setSelected([...selected, option]);
  };

  return (
    <div className="multiselect">
      <div
        className="multiselect__selected"
        onClick={() => {
          setIsActive(!isActive);
        }}>
        {/* {selected.map((element) => {

        })} */}
      </div>
      {isActive && (
        <div className="multiselect__options">
          {Children.toArray(children).map((element) => {
            return (
              <div className="multiselect__option" onClick={() => handleSelect(children)}>
                {element}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
