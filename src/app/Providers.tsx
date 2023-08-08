"use client";

import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      useErrorBoundary: true,
    },
  },
});

interface Props {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        <JotaiProvider>{children}</JotaiProvider>
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
};

export default Providers;
