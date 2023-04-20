import { createContext, Dispatch, MouseEventHandler, useState } from "react";
import { Mode } from "@/types/Mode";
import { Theme } from "@/types/Theme";

export interface IMode {
  theme: Mode;
  setTheme: Dispatch<React.SetStateAction<Mode>>;
  toggleTheme: MouseEventHandler;
  mainColor: Theme;
  setMainColor: Dispatch<React.SetStateAction<Theme>>;
}

export const ThemesContext = createContext<IMode>(null!);

export function ThemesProvider({ children }: { children: JSX.Element }) {

  const [theme, setTheme] = useState<Mode>("light");
  const [mainColor, setMainColor] = useState<Theme>("primary");


  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <ThemesContext.Provider value={{ theme, setTheme, toggleTheme, mainColor, setMainColor }}>
      {children}
    </ThemesContext.Provider>
  );
}
