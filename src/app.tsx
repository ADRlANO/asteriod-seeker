import { Router } from "@solidjs/router";
import { MetaProvider, Title } from "@solidjs/meta";
import { FileRoutes } from "@solidjs/start/router";
import { queryClient } from "~/lib/tanstack-query";
import { QueryClientProvider } from "@tanstack/solid-query";
import { ParentProps, Suspense } from "solid-js";
import "./app.css";

import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <QueryClientProvider client={queryClient}>
            <Title>Asteroid Seeker</Title>
            <Layout>{props.children}</Layout>
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
  return (
    <Suspense>
      <div class="w-screen h-screen">
        {/* <div class="bg-slate-800 text-white"></div> */}
        {props.children}
      </div>
    </Suspense>
  );
}
