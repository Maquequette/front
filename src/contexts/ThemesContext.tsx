import {
  createContext,
  type Dispatch,
  type MouseEventHandler,
  useCallback,
  useState,
  memo
} from "react";
import { type Mode } from "@/types/Mode";
import { type Theme } from "@/types/Theme";

export interface IMode {
  theme: Mode;
  setTheme: Dispatch<React.SetStateAction<Mode>>;
  toggleTheme: MouseEventHandler;
  mainColor: Theme;
  setMainColor: Dispatch<React.SetStateAction<Theme>>;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ThemesContext = createContext<IMode>(null!);

const ThemesProvider = memo(function ThemesProvider({ children }: { children: JSX.Element }) {
  const [theme, setTheme] = useState<Mode>("light");
  const [mainColor, setMainColor] = useState<Theme>("primary");

  const toggleTheme = useCallback(() => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    }
  }, [theme]);

  return (
    <ThemesContext.Provider value={{ theme, setTheme, toggleTheme, mainColor, setMainColor }}>
      {children}
    </ThemesContext.Provider>
  );
});

export { ThemesProvider };
