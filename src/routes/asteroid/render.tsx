import { createEffect, createSignal, Show } from "solid-js";
import { debounce, isEmpty } from "lodash-es";

import AsteroidCollection from "~/components/asteroid-collection";
import DateRangePicker from "~/components/date-range-picker";
import SearchBar from "~/components/search-bar";
import LoadingSpinner from "~/components/loading";
import ErrorMessage from "~/components/error-message";

import { useAsteroids } from "~/lib/queries";
import AsteroidTable from "~/components/table/asteroids";
import { createStore } from "solid-js/store";
import { createMemo } from "solid-js";
import { createQuery } from "@tanstack/solid-query";
import { fetchAsteroids } from "~/lib/api";

export default function Home() {
  return (
    <div class="min-h-screen bg-gray-100">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <h1 class="text-3xl font-bold text-gray-900 mb-8">
            Near Earth Asteroids Tracker
          </h1>
          <AsteroidPanel />
        </div>
      </div>
    </div>
  );
}

function AsteroidPanel() {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = createSignal(new Date(today));
  const [endDate, setEndDate] = createSignal(new Date(today));
  const [searchTerm, setSearchTerm] = createSignal("");

  const setDebouncedSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const params = createMemo(() => ({
    start_date: startDate(),
    end_date: endDate(),
    search_term: searchTerm(),
  }));

  createEffect(() => {
    console.log("searchTerm() :>> ", searchTerm());
  });
  // const asteroidQuery = useAsteroids(params());
  // const asteroidQuery = useAsteroids(startDate(), endDate(), searchTerm());
  const queryKey = () => [
    "asteroids",
    {
      start_date: startDate(),
      end_date: endDate(),
      search_term: searchTerm(),
    },
  ];
  const asteroidQuery = createQuery(() => ({
    queryKey: queryKey(),
    queryFn: async (fn) => {
      console.log("fn :>> ", fn);
      return await fetchAsteroids({
        start_date: startDate(),
        end_date: endDate(),
        search_term: searchTerm(),
      });
    },
    experimental_prefetchInRender: true,
  }));

  return (
    <div class="bg-white shadow rounded-lg p-6 mb-8">
      <Show when={!asteroidQuery.isLoading} fallback={<LoadingSpinner />}>
        <Show
          when={!asteroidQuery.error}
          fallback={<ErrorMessage error={asteroidQuery.error} />}
        >
          <Show
            when={!isEmpty(asteroidQuery.data)}
            fallback={<EmptyAsteroids />}
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <DateRangePicker
                startDate={startDate()}
                endDate={endDate()}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
              <SearchBar onSearch={setDebouncedSearch} />
            </div>
            <AsteroidTable data={asteroidQuery.data} />
          </Show>
        </Show>
      </Show>
    </div>
  );
}

function EmptyAsteroids() {
  return <div>No asteroids found :(</div>;
}

// full_name: "Albion",
// $collation: { locale: "en", strength: 2 },

// full_name: {
//   $text: { $search: "Albion" },
// }
