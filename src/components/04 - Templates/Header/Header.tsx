import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/01 - Atoms/Container/Container";
import Navigation from "@/components/03 - Organisms/Navigation/Navigation";
import Logo from "@/components/01 - Atoms/Logo/Logo";
import Burger from "@/components/02 -  Molecules/Burger/Burger";
import "./Header.scss";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <Container center={true} classes="header__container">
        <Logo />
        <Navigation isOpen={isOpen} />
        <Burger handleClick={toggleOpen} />
      </Container>
      <motion.div
        className="header__transition"
        initial={true}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            clipPath: "circle(200vh at calc(100% - 6rem) 5rem)",
            transition: {
              type: "spring",
              stiffness: 20,
              restDelta: 2
            }
          },
          closed: {
            clipPath: "circle(0rem at calc(100% - 6rem) 5rem)",
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 40
            }
          }
        }}></motion.div>
    </header>
  );
}
