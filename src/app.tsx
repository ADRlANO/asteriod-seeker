import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ParentProps, Suspense } from "solid-js";
import "./app.css";
import { QueryClientProvider } from "@tanstack/solid-query";
import { queryClient } from "~/lib/tanstack-query";

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

function Layout(props: ParentProps) {
  return <Suspense>{props.children}</Suspense>;
}
