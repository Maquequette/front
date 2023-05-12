import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import useDisableScroll from "@/hooks/useDisableScroll";
import Breadcrumb from "@/components/01 - Atoms/Breadcrumb/Breadcrumb";
import Button from "@/components/01 - Atoms/Button/Button";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Container from "@/components/01 - Atoms/Container/Container";
import { Theme } from "@/types/Theme";
import "./Filters.scss";

export interface IColoredLine {
  children: ReactNode;
  theme: Theme;
  headContent?: ReactNode;
}

export default function Filters({ children, theme, headContent }: IColoredLine) {
  const { enable, disable } = useDisableScroll();
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = useCallback(() => {
    setIsOpen(!isOpen);
    !isOpen ? disable() : enable();
  }, [isOpen]);

  //   useEffect(() => {
  //     mobileOpen.challengeSearch ? disable() : enable();
  //   }, [mobileOpen.challengeSearch]);

  return (
    <div className={`filters filters--${theme}`}>
      <Container center={true}>
        <div className="filters__header">
          <div className="filters__actions">
            <Breadcrumb />
            <Button theme={"dark"} handleClick={toggleFilter}>
              search & more
              <Svg id="glass" styles={{ width: "2.5rem", height: "2.5rem" }} />
            </Button>
          </div>
          <div className={clsx("filters__header", { active: isOpen })}>{headContent}</div>
        </div>
        <div className="filters__body">{children}</div>
      </Container>
    </div>
  );
}
