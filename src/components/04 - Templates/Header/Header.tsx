import { useCallback, useEffect, useState } from "react";
import useDisableScroll from "@/hooks/useDisableScroll";
import Container from "@/components/01 - Atoms/Container/Container";
import Navigation from "@/components/03 - Organisms/Navigation/Navigation";
import Logo from "@/components/01 - Atoms/Logo/Logo";
import Burger from "@/components/02 - Molecules/Burger/Burger";
import { useLocation } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  const { enable, disable } = useDisableScroll();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsOpen((p) => {
      !p ? enable() : disable();
      return !p;
    });
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`header ${isOpen ? "header--open" : ""}`}>
      <Container center={true} isLarge={true} classes="header__container">
        <div className="header__logo">
          <Logo />
        </div>
        <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
        <Burger isOpen={isOpen} handleClick={toggleMenu} />
      </Container>
    </header>
  );
}
