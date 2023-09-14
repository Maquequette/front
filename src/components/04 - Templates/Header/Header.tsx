import { useCallback, useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import Container from "@/components/01 - Atoms/Container/Container";
import Navigation from "@/components/03 - Organisms/Navigation/Navigation";
import Logo from "@/components/01 - Atoms/Logo/Logo";
import Burger from "@/components/02 - Molecules/Burger/Burger";
import useDisableScroll from "@/hooks/useDisableScroll";
import "./Header.scss";

export default memo(function Header() {
  const { enable, disable } = useDisableScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const onScroll = (e: any) => {
      if (e.target.documentElement.scrollTop > 50) {
        setHasScroll(true);
      } else {
        setHasScroll(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((p) => {
      !p ? disable() : enable();
      return !p;
    });
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`header ${isOpen ? "header--open" : ""} ${hasScroll ? "header--scrolled" : ""}`}>
      <Container center={true} isLarge={true} classes="header__container">
        <div className="header__logo">
          <Logo />
        </div>
        <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
        <Burger isOpen={isOpen} handleClick={toggleMenu} />
      </Container>
    </header>
  );
});
