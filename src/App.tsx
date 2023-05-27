import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "@/router/Router";
import useToasts from "@/hooks/useToasts";

export default function App() {
  const { pushToast } = useToasts();

  const queryClient = new QueryClient({
    // configure global cache callbacks to show toast notifications
    mutationCache: new MutationCache({
      onError: (error: any) => {
        pushToast({
          title: `Woops ! ${error.response.data.title}`,
          desc: error.response.data.detail,
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
