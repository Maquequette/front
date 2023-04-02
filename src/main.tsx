import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App";
import { ThemesProvider } from "./contexts/ThemesContext";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";

import "./i18n";
import "./index.scss";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemesProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ThemesProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
