import { Router } from "@solidjs/router";
import { Suspense } from "solid-js";
import { FileRoutes } from "@solidjs/start/router";
import { queryClient } from "~/lib/tanstack-query";
import { MetaProvider, Title } from "@solidjs/meta";
import { QueryClientProvider } from "@tanstack/solid-query";
import "./app.css";

import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <QueryClientProvider client={queryClient}>
            <Title>Asteroid Seeker</Title>
            <Suspense>{props.children}</Suspense>
            <SolidQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
