import { useContext } from "react";
import { ThemesContext } from "@/contexts/ThemesContext";
import Router from "./router/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useToasts from "./hooks/useToasts";
import { ThemesProvider } from "@/contexts/ThemesContext";
import { ToastProvider } from "./contexts/ToastContext";

export default function App() {
  const { pushToast } = useToasts();

  const queryClient = new QueryClient({
    // configure global cache callbacks to show toast notifications
    mutationCache: new MutationCache({
      onError: (error: any) => {
        pushToast({
          title: `Woops ! ${error.name}`,
          desc: error.message,
          theme: "danger"
        });
      }
    })
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
