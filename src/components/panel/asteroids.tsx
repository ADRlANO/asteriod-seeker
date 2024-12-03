import { get, isEmpty } from "lodash-es";
import { clientOnly } from "@solidjs/start";
import { createSignal, Show } from "solid-js";
import { parseISO, isBefore, differenceInDays } from "date-fns";

import { useLocalStorage } from "~/lib/store";
import { useAsteroidByIds } from "~/lib/queries";
import { ControlledSelect } from "~/components/select";

import ErrorMessage from "~/components/error-message";
import LoadingSpinner from "~/components/loading";
import DateRangePicker from "~/components/date-range-picker";

const AsteroidTable = clientOnly(() => import("~/components/table/asteroids"));

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

const filterOptions = [
  { value: "ALL", label: "All Asteroids" },
  { value: "FAVOURITES", label: "Favourites" },
] as const;

function EmptyAsteroids() {
  return <div>No asteroids found :(</div>;
}
export default function AsteroidPanel() {
  const [user] = useLocalStorage("user");
  const [filter, set_filter] = createSignal({
    value: "ALL",
    label: "All Asteroids",
  });

  const activate_favourite = () => filter().value === "FAVOURITES";

  const initialParams = {
    search_term: "",
    end_date: new Date("2015-09-10"),
    start_date: new Date("2015-09-07"),
    sort: {
      value: "ASC",
      label: "Ascending",
    },
  };
  const { query, params, setParams } = useAsteroidByIds(initialParams);
  const [dateValidationResult, setDateValidationResult] = createSignal({
    valid: true,
    message: "",
  });

  return (
    <div class="bg-white shadow rounded-lg p-6 mb-8">
      <Show when={!query.isLoading} fallback={<LoadingSpinner />}>
        <Show
          when={!query.error}
          fallback={<ErrorMessage error={query.error?.message as string} />}
        >
          <Show
            when={!query.isLoading && !isEmpty(query.data)}
            fallback={<EmptyAsteroids />}
          >
            <div class="grid justify-between md:flex gap-4 mb-6">
              <div class="grid">
                <Show when={!dateValidationResult().valid}>
                  <ErrorMessage error={dateValidationResult().message} />
                </Show>
                <DateRangePicker
                  startDate={params.start_date}
                  endDate={params.end_date}
                  onStartDateChange={(date) => {
                    const validationResult = validateDates(
                      date as Date,
                      params.start_date
                    );

                    setDateValidationResult(validationResult);
                    if (validationResult.valid) {
                      setParams("start_date", date as Date);
                    }
                  }}
                  onEndDateChange={(date) => {
                    const validationResult = validateDates(
                      params.start_date,
                      date as Date
                    );

                    setDateValidationResult(validationResult);

                    if (validationResult.valid) {
                      setParams("end_date", date as Date);
                    }
                  }}
                />
              </div>

              <div class="flex gap-4">
                <Show when={user()}>
                  <ControlledSelect
                    label="Filter by ..."
                    options={filterOptions}
                    value={filter()}
                    onChange={(value) => {
                      set_filter(value);
                    }}
                    labelKey="label"
                    valueKey="value"
                  />
                </Show>
                <ControlledSelect
                  label="Sort by name"
                  options={sortOptions}
                  value={params.sort}
                  onChange={(value) => {
                    setParams("sort", value);
                  }}
                  labelKey="label"
                  valueKey="value"
                />
              </div>
            </div>

            <AsteroidTable
              data={
                activate_favourite()
                  ? filterAsteroidsByFavourites(user(), query.data)
                  : query.data
              }
            />
          </Show>
        </Show>
      </Show>
    </div>
  );

  //TODO types
  function filterAsteroidsByFavourites(user: any, data: any) {
    const asteroids = data ?? [];
    const user_favourites = user?.favourites || [];
    console.log("user_favourites :>> ", user_favourites);
    return asteroids.filter((asteroid: any) =>
      user_favourites.includes(asteroid.id)
    );
  }
}

type ValidationResult = {
  valid: boolean;
  message: string;
};

function validateDates(
  startDate: string | Date,
  endDate: string | Date
): ValidationResult {
  const start = typeof startDate === "string" ? parseISO(startDate) : startDate;
  const end = typeof endDate === "string" ? parseISO(endDate) : endDate;

  // Check if start date is after end date`
  if (start.getTime() !== end.getTime() && !isBefore(start, end)) {
    return {
      valid: false,
      message: "Start date cannot be after the end date.",
    };
  }

  if (differenceInDays(end, start) > 7) {
    return {
      valid: false,
      message: "End date cannot be more than 7 days after the start date.",
    };
  }

  return {
    valid: true,
    message: "Dates are valid.",
  };
}
