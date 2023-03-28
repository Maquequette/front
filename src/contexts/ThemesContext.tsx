import { Mode } from "@/types/Mode";

export interface IMode {
  theme: Mode;
  setTheme: React.Dispatch<React.SetStateAction<Mode>>;
  toggleTheme: MouseEventHandler;
}

import { createContext, MouseEventHandler, useState } from "react";

export const ThemesContext = createContext<IMode>(null!);

export function ThemesProvider({ children }: { children: JSX.Element }) {
  const [theme, setTheme] = useState<Mode>("light");

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <ThemesContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemesContext.Provider>
  );
}
