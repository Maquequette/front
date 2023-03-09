import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import "./index.scss";
import { ThemesProvider } from "@/contexts/ThemesContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemesProvider>
      <App />
    </ThemesProvider>
  </React.StrictMode>
);
