import { useContext, useEffect, useState } from "react";
import { MobileContext } from "@/contexts/MobileContext";
import useDisableScroll from "@/hooks/useDisableScroll";
import Container from "@/components/01 - Atoms/Container/Container";
import Navigation from "@/components/03 - Organisms/Navigation/Navigation";
import Logo from "@/components/01 - Atoms/Logo/Logo";
import Burger from "@/components/02 - Molecules/Burger/Burger";
import "./Header.scss";

export default function Header() {

  const { iconOpen, mobileOpen, setMobileOpen, toggleMobileOpen, toggleMobileClose } = useContext(MobileContext)
  const { enable, disable } = useDisableScroll()

  useEffect(() => {
    mobileOpen.menu ? disable() : enable()
  }, [mobileOpen.menu])

  return (
    <header className={`header ${mobileOpen.menu ? "header--open" : ""}`}>
      <Container center={true} isLarge={true} classes="header__container">
        <div className="header__logo">
          <Logo />
        </div>
        <Navigation isOpen={mobileOpen.menu} callback={() => setMobileOpen({ ...mobileOpen, menu: !mobileOpen.menu })} />
        <Burger isOpen={iconOpen} handleClick={() => !iconOpen ? toggleMobileOpen("menu") : toggleMobileClose()} />
      </Container>
    </header>
  );
}
