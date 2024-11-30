import { createEffect, createSignal, Show } from "solid-js";

import { debounce, isEmpty } from "lodash-es";

import SearchBar from "~/components/search-bar";
import ErrorMessage from "~/components/error-message";
import LoadingSpinner from "~/components/loading";
import DateRangePicker from "~/components/date-range-picker";

import AsteroidTable from "~/components/table/asteroids";
import { useAsteroids } from "~/lib/queries";
import { ControlledSelect } from "~/components/select";

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

const sortOptions = [
  {
    value: "ASC",
    label: "Ascending",
  },
  {
    value: "DESC",
    label: "Descending",
  },
] as const;

export type SortOption = (typeof sortOptions)[number];

function AsteroidPanel() {
  const initialParams = {
    search_term: "",
    end_date: new Date("2015-09-08"),
    start_date: new Date("2015-09-07"),
    sort: {
      value: "ASC",
      label: "Ascending",
    },
  };
  const { query, params, setParams } = useAsteroids(initialParams);
  const [dateValidationResult, setDateValidationResult] = createSignal({
    valid: true,
    message: "",
  });

  createEffect(() => {
    // console.log("options() :>> ", options());
    // console.group("params");
    // console.log("params :>> ", params.start_date);
    // console.log("params :>> ", params.end_date);
    // console.log("params :>> ", params.sort);
    // console.groupEnd();
    // console.group("query");
    // console.log("query.isLoading :>> ", query.isLoading);
    // console.log("query.data :>> ", query.data);
    // console.log("query.error :>> ", query.error);
    // console.groupEnd();
  });

  const setDebouncedSearch = debounce(
    (value) => setParams("search_term", value),
    300
  );

  return (
    <div class="bg-white shadow rounded-lg p-6 mb-8">
      <Show when={!query.error} fallback={<ErrorMessage error={query.error} />}>
        <Show
          when={!query.isLoading && !isEmpty(query.data)}
          fallback={<EmptyAsteroids />}
        >
          <div class="grid justify-between md:flex gap-4 mb-6">
            <Show when={!dateValidationResult().valid}>
              <ErrorMessage error={dateValidationResult().message} />
            </Show>
            <DateRangePicker
              startDate={params.start_date}
              endDate={params.end_date}
              onStartDateChange={(date) => {
                const validationResult = validateDates(date, params.start_date);

                setDateValidationResult(validationResult);
                if (validationResult.valid) {
                  setParams("start_date", date);
                }
              }}
              onEndDateChange={(date) => {
                const validationResult = validateDates(params.start_date, date);

                setDateValidationResult(validationResult);

                if (validationResult.valid) {
                  setParams("end_date", date);
                }
              }}
            />

            {/* <SearchBar onSearch={setDebouncedSearch} /> */}
            <ControlledSelect
              label="Sort by name"
              options={sortOptions}
              value={params.sort}
              onChange={(value) => {
                console.log("value :>> ", value);
                setParams("sort", value);
              }}
              labelKey="label"
              valueKey="value"
            />
          </div>
          <Show when={!query.isLoading} fallback={<LoadingSpinner />}>
            <AsteroidTable data={query.data} />
          </Show>
        </Show>
      </Show>
    </div>
  );
}

function EmptyAsteroids() {
  return <div>No asteroids found :(</div>;
}
import { isBefore, differenceInDays, parseISO } from "date-fns";

type ValidationResult = {
  valid: boolean;
  message: string;
};

/**
 * Validates start and end dates.
 * @param startDate - The start date as a string (ISO format) or Date object.
 * @param endDate - The end date as a string (ISO format) or Date object.
 * @returns An object containing the validation result.
 */
function validateDates(
  startDate: string | Date,
  endDate: string | Date
): ValidationResult {
  console.log("startDate :>> ", startDate);
  console.log("endDate :>> ", endDate);
  const start = typeof startDate === "string" ? parseISO(startDate) : startDate;
  const end = typeof endDate === "string" ? parseISO(endDate) : endDate;

  // Check if start date is after end date
  if (start.getTime() !== end.getTime() && !isBefore(start, end)) {
    return {
      valid: false,
      message: "Start date cannot be after the end date.",
    };
  }

  // Check if the difference between dates is more than 7 days
  const diffInDays = differenceInDays(end, start);
  if (diffInDays > 7) {
    return {
      valid: false,
      message: "End date cannot be more than 7 days after the start date.",
    };
  }

  // Dates are valid
  return {
    valid: true,
    message: "Dates are valid.",
  };
}
