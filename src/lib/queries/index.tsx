import { createQuery } from "@tanstack/solid-query";
import { createStore } from "solid-js/store";
import { createEffect } from "solid-js";

import { fetchAsteroids, fetchAsteroidById } from "~/lib/api";

type AsteroidParams = {
  start_date: Date;
  end_date: Date;
  search_term: string;
  sort: any;
};

export function useAsteroids(initialParams: AsteroidParams) {
  const [params, setParams] = createStore(initialParams);

  createEffect(() => {
    console.log("start_date :>> ", params.start_date);
    console.log("end_date :>> ", params.end_date);
  });

  const query = createQuery(() => ({
    queryKey: ["asteroids", params],
    queryFn: async () => fetchAsteroids(params),
    experimental_prefetchInRender: true,
    initialData: async () => fetchAsteroids(params),
  }));

  return { params, setParams, query };
}

export function useAsteroid(id: string) {
  console.log("id :>> ", id);

  const query = createQuery(() => ({
    queryKey: ["asteroid", { id }],
    queryFn: async () => {
      return await fetchAsteroidById(id);
    },
    experimental_prefetchInRender: true,
  }));

  return { query };
}
