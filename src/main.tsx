import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemesProvider } from "./contexts/ThemesContext";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";
import "./i18n";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemesProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemesProvider>
    </AuthProvider>
  </React.StrictMode>
);
