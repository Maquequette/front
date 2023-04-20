import { useContext } from "react";
import { ThemesContext } from "@/contexts/ThemesContext";
import Router from "./router/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useToasts from "./hooks/useToasts";
import { MobileProvider } from "./contexts/MobileContext";

export default function App() {
  const { theme } = useContext(ThemesContext)
  const { pushToast } = useToasts()

  const queryClient = new QueryClient({
    // configure global cache callbacks to show toast notifications
    mutationCache: new MutationCache({
      onError: (error: any) => {
        console.log(error)
        pushToast({
          title: `Woops ! ${error.name}`,
          desc: error.message,
          theme: 'danger'
        })
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MobileProvider>
        <div data-theme={theme} className="app">
          <AuthProvider>
            <Router />
          </AuthProvider>
        </div>
      </MobileProvider>
    </QueryClientProvider>
  );
}
