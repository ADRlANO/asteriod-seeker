import { isEmpty } from "lodash-es";
import { createQuery } from "@tanstack/solid-query";
import { createStore } from "solid-js/store";

import { fetchAsteroids, fetchAsteroidById } from "~/lib/api";

type AsteroidParams = {
  start_date: Date;
  end_date: Date;
  search_term: string;
  sort: any;
};

export function useAsteroidByIds(initialParams: AsteroidParams) {
  console.log("FETCH Asteroid");
  const [params, setParams] = createStore(initialParams);

  const query = createQuery(() => ({
    queryKey: ["asteroids", params],
    queryFn: async () => fetchAsteroids(params),
    experimental_prefetchInRender: true,
  }));

  return { params, setParams, query };
}

export function useAsteroidById(id: string) {
  console.log("FETCH Asteroid BY id :>> ", id);

  const query = createQuery(() => ({
    queryKey: ["asteroid", { id }],
    queryFn: async () => {
      return await fetchAsteroidById(id);
    },
    enabled: !isEmpty(id),
    experimental_prefetchInRender: true,
  }));

  return { query, data: query.data };
}
