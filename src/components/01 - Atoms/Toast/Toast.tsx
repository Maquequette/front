import { Theme } from "@/types/Theme";

export interface IToast {
  id: number;
  title: string;
  desc: string;
  theme: Theme;
  duration?: number;
  timer: ReturnType<typeof setTimeout>;
}

export default function Toast({ title, desc, theme }: IToast) {
  return <div className="toast"></div>;
}
