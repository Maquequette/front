import { useContext } from "react";
import { ThemesContext } from "@/contexts/ThemesContext";
import { motion } from "framer-motion";
import "./ThemeSwapper.scss";

export default function ThemeSwapper() {
  const { theme, setTheme, toggleTheme } = useContext(ThemesContext);

  return (
    <div className="theme" onClick={toggleTheme}>
      <svg
        id="theme"
        x="0px"
        y="0px"
        viewBox="0 0 543 567"
        xmlSpace="preserve"
        className="theme__icon">
        <g>
          <motion.path
            initial={true}
            animate={theme}
            variants={{
              dark: {
                d: "M493.2,386.2c-38.4,88.1-125.5,145.2-221.9,145.2c-133.6,0-242.5-108.9-242.5-242.5C28.8,193.1,85.6,106,173.4,67 c7.7-3.5,17-1.9,23,4.4c6,6,7.9,15.1,4.4,22.8C127.5,262.4,300,432.4,465.8,359c7.9-3.5,17-1.9,23,4.1 C494.9,369.2,496.7,378.3,493.2,386.2L493.2,386.2z"
              },
              light: {
                d: "M279.3,531.6c-2.9-2.9-4.5-6.8-4.4-10.8v-65.2c0-5.4,2.9-10.3,7.5-13c4.7-2.7,10.4-2.7,15,0c4.7,2.7,7.5,7.7,7.5,13v65.2 c0.1,4-1.5,7.8-4.3,10.7c-2.8,2.9-6.6,4.5-10.6,4.6H290C286,536,282.2,534.4,279.3,531.6L279.3,531.6z M446.7,462l-46.1-46.1 c-2.9-2.8-4.5-6.7-4.5-10.7c0-4,1.6-7.9,4.4-10.7c2.8-2.8,6.7-4.4,10.7-4.4c4,0,7.9,1.7,10.7,4.5l46.1,46.1h0 c2.9,2.8,4.5,6.6,4.5,10.7c0,4-1.6,7.9-4.4,10.7c-2.8,2.8-6.7,4.4-10.7,4.4C453.4,466.5,449.5,464.9,446.7,462L446.7,462z M111.9,462.3L111.9,462.3c-2.9-2.8-4.6-6.7-4.6-10.8s1.6-8,4.6-10.8l46.1-46.1h0c2.8-2.9,6.6-4.5,10.7-4.5c4,0,7.9,1.6,10.7,4.4 c2.8,2.8,4.4,6.7,4.4,10.7c0,4-1.7,7.9-4.5,10.7L133.2,462h0c-2.8,2.9-6.6,4.5-10.6,4.6C118.7,466.6,114.8,465.1,111.9,462.3 L111.9,462.3z M174.4,284c0-30.7,12.2-60.1,33.9-81.7c21.7-21.7,51.1-33.9,81.7-33.9c30.7,0,60.1,12.2,81.7,33.9 c21.7,21.7,33.9,51.1,33.9,81.7c0,30.7-12.2,60.1-33.9,81.7s-51.1,33.9-81.7,33.9c-30.7,0-60.1-12.2-81.7-33.9 C186.6,344,174.4,314.6,174.4,284z M446.4,284c0-4,1.6-7.8,4.4-10.6c2.8-2.8,6.6-4.4,10.6-4.4h65.2c4-0.1,7.9,1.5,10.8,4.3 c2.9,2.8,4.5,6.7,4.5,10.7c0,4-1.6,7.9-4.5,10.7c-2.9,2.8-6.8,4.4-10.8,4.3h-65.2c-4,0-7.8-1.6-10.6-4.4 C448,291.8,446.4,288,446.4,284L446.4,284z M53.2,299c-4,0.1-7.9-1.5-10.8-4.3C39.6,291.9,38,288,38,284c0-4,1.6-7.9,4.5-10.7 c2.9-2.8,6.7-4.4,10.8-4.3h65.2c5.4,0,10.3,2.9,13,7.5c2.7,4.7,2.7,10.4,0,15c-2.7,4.7-7.7,7.5-13,7.5L53.2,299z M400.6,173.4 c-2.8-2.8-4.4-6.6-4.4-10.6s1.6-7.8,4.4-10.6l46.1-46.1c2.8-2.9,6.6-4.5,10.7-4.5c4,0,7.9,1.6,10.7,4.4c2.8,2.8,4.4,6.7,4.4,10.7 s-1.7,7.9-4.5,10.7l-46.1,46.1c-2.8,2.8-6.6,4.4-10.6,4.4S403.4,176.2,400.6,173.4L400.6,173.4z M158.1,173.3L112,127.2h0 c-2.9-2.8-4.5-6.6-4.5-10.7s1.6-7.9,4.4-10.7c2.8-2.8,6.7-4.4,10.7-4.4c4,0,7.9,1.7,10.7,4.5l46.1,46.1h0c2.8,2.8,4.4,6.6,4.5,10.6 c0,4-1.6,7.8-4.4,10.7c-2.8,2.8-6.7,4.4-10.7,4.4S160.9,176.2,158.1,173.3L158.1,173.3z M274.9,112.5V47.3v-0.2 c0-5.4,2.9-10.3,7.5-13c4.7-2.7,10.4-2.7,15,0c4.7,2.7,7.5,7.6,7.5,13v0.2v65.2c0,5.4-2.9,10.3-7.5,13c-4.7,2.7-10.4,2.7-15,0 C277.8,122.8,274.9,117.9,274.9,112.5L274.9,112.5z"
              }
            }}
          />
          <motion.path
            initial={true}
            animate={theme}
            variants={{
              dark: {
                d: "M517.3,83.3c-23.2-8.8-41.7-27.4-50.4-50.8c-1.9-5.2-8.8-5.2-10.8,0c-8.8,23.2-27.5,41.7-51,50.3c-5.2,1.9-5.2,8.9,0,10.8 c23.4,8.8,42,27.4,50.7,50.8c1.9,5.2,8.8,5.2,10.8,0c8.8-23.2,27.4-41.7,50.7-50.4C522.5,92.2,522.5,85.3,517.3,83.3L517.3,83.3z",
                opacity: 1
              },
              light: {
                opacity: 0
              }
            }}
          />
          <motion.path
            initial={true}
            animate={theme}
            variants={{
              dark: {
                d: "M353.5,178.8c-23.2-8.8-41.7-27.4-50.4-50.8c-1.9-5.2-8.8-5.2-10.8,0c-8.8,23.2-27.5,41.7-51,50.3c-5.2,1.9-5.2,8.9,0,10.8 c23.4,8.8,42,27.4,50.7,50.8c1.9,5.2,8.8,5.2,10.8,0c8.8-23.2,27.4-41.7,50.7-50.4C358.7,187.7,358.7,180.8,353.5,178.8 L353.5,178.8z",
                opacity: 1
              },
              light: {
                opacity: 0
              }
            }}
          />
        </g>
      </svg>
    </div>
  );
}
