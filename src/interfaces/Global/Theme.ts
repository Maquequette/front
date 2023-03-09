import { Theme } from "@/types/Theme/Theme";

export interface ITheme {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}
