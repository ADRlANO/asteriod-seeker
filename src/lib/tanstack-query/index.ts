import { QueryClient } from "@tanstack/solid-query";

let instance: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (instance) return instance;

  instance = new QueryClient();
  return instance;
};

const queryClient = getQueryClient();

export { queryClient };
