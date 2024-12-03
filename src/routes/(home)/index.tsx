import { Navigate, useSearchParams } from "@solidjs/router";

export default function Home() {
  const [search_params] = useSearchParams();
  return <Navigate href={`/asteroid/render?token=${search_params.token}`} />;
}
