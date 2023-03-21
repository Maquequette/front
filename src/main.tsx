import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemesProvider } from "@/contexts/ThemesContext";
import { ToastProvider } from "./contexts/ToastContext";
import "./i18n";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemesProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemesProvider>
  </React.StrictMode>
);
