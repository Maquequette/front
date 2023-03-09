import { Mode } from "@/types/Mode";

export interface IMode {
  theme: Mode;
  setTheme: React.Dispatch<React.SetStateAction<Mode>>;
}

import { createContext, useState } from "react";

export const ThemesContext = createContext<IMode>(null!);

export function ThemesProvider({ children }: { children: JSX.Element }) {
  const [theme, setTheme] = useState<Mode>("light");

  return (
    <ThemesContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemesContext.Provider>
  );
}
