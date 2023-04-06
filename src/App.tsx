import { useContext } from "react";
import { ThemesContext } from "@/contexts/ThemesContext";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  const { theme } = useContext(ThemesContext);

  return (
    <div data-theme={theme} className="app">
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
