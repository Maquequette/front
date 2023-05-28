import { ReactNode, useCallback, memo, useState } from "react";
import clsx from "clsx";
import Burger from "../Burger/Burger";
import Button from "@/components/01 - Atoms/Button/Button";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Container from "@/components/01 - Atoms/Container/Container";
import useDisableScroll from "@/hooks/useDisableScroll";
import { Theme } from "@/types/Theme";
import "./Filters.scss";

export interface IColoredLine {
  children: ReactNode;
  theme: Theme;
  headContent?: ReactNode;
}

export default memo(function Filters({ children, theme, headContent }: IColoredLine) {
  const { enable, disable } = useDisableScroll();
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = useCallback(() => {
    setIsOpen((p) => {
      !p ? disable() : enable();
      return !p;
    });
  }, []);

  return (
    <div className={`filters filters--${theme}`}>
      <Container center={true}>
        <div className="filters__header">
          <div className="filters__actions">
            <Button theme={"dark"} handleClick={toggleFilter}>
              search & more
              <Svg id="glass" styles={{ width: "2.5rem", height: "2.5rem" }} />
            </Button>
          </div>
          <div className={clsx("filters__inputs", { active: isOpen })}>
            <Burger handleClick={toggleFilter} isOpen={isOpen} />
            {headContent}
          </div>
        </div>
        <div className="filters__body">{children}</div>
      </Container>
    </div>
  );
});
