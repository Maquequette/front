import { ITheme } from "@/interfaces/Global/Theme";
import { Theme } from "@/types/Theme/Theme";
import { createContext, useState } from "react";

export const ThemesContext = createContext<ITheme>(null!);

export function ThemesProvider({ children }: { children: JSX.Element }) {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <ThemesContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemesContext.Provider>
  );
}
