import { useContext } from "react";
import { ThemesContext } from "@/contexts/ThemesContext";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";

export default function App() {
  const { theme } = useContext(ThemesContext);
  return (
    <div data-theme={theme} className="app">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}
