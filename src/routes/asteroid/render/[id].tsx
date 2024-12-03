import { get, isEmpty } from "lodash-es";
import { createEffect, Show } from "solid-js";
import {
  useNavigate,
  useSearchParams,
  RouteSectionProps,
} from "@solidjs/router";

import { Button } from "~/components/ui/button";
import { useAsteroidById } from "~/lib/queries";
import LoadingSpinner from "~/components/loading";

export default function RenderAsteroidByID(props: RouteSectionProps) {
  const { query } = useAsteroidById(props.params.id);

  createEffect(() => {
    console.log("Asteroid Details :>> ", query.data);
  });

  return (
    <Show when={!isEmpty(query.data)} fallback={<LoadingSpinner />}>
      <AsteroidDetails asteroid={query.data} />
    </Show>
  );
}

//TODO types
function AsteroidDetails(props: { asteroid: any }) {
  const asteroid = props.asteroid;
  const navigate = useNavigate();
  const [search_params] = useSearchParams();

  const isFavourite = () => search_params.is_favourite === "true";
  // Retrieve fields
  const name = get(asteroid, "name", "Unknown");
  const absoluteMagnitude = get(asteroid, "absolute_magnitude_h", "N/A");
  const firstObservationDate = get(
    asteroid,
    "orbital_data.first_observation_date",
    "Unknown"
  );
  const lastObservationDate = get(
    asteroid,
    "orbital_data.last_observation_date",
    "Unknown"
  );
  const orbitClassType = get(
    asteroid,
    "orbital_data.orbit_class.orbit_class_type",
    "N/A"
  );
  const orbitClassDescription = get(
    asteroid,
    "orbital_data.orbit_class.orbit_class_description",
    "N/A"
  );

  return (
    <div class="max-w-lg mx-auto my-8 bg-gray-100 shadow-lg rounded-lg overflow-hidden h-[700px]">
      {/* Hero Section */}
      <div class="relative bg-blue-500 text-white p-8">
        {/* Asteroid Name */}
        <h1 class="text-3xl font-bold text-center">{name}</h1>
        <p class="text-center text-xl mt-2">{`Magnitude: [${absoluteMagnitude}]`}</p>

        {/* Diagonal Stripe */}
        <div class="absolute top-0 right-0 h-full w-full p-2">
          <div class="absolute -top-[5%] right-[5%] bg-white text-blue-500 shadow-md px-4 py-2 rounded-md cursor-pointer">
            <span class="text-2xl">{isFavourite() ? "⭐" : "☆"}</span>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div class="divide-y divide-gray-300">
        {/* Observation Details */}
        <div class="flex p-4">
          <p class="font-semibold">First Observed:</p>
          <p class="text-gray-700">{` [${firstObservationDate}]`}</p>
        </div>
        <div class="flex  p-4">
          <p class="font-semibold">Last Observed:</p>
          <p class="text-gray-700">{` [${lastObservationDate}]`}</p>
        </div>

        {/* Orbit Class */}
        <div class="p-4">
          <div class="flex ">
            <p class="font-semibold">Orbit Class:</p>
            <p class="text-gray-700">{`[${orbitClassType}]`}</p>
          </div>
          <p class="text-gray-500 text-sm mt-1">{`[${orbitClassDescription}]`}</p>
        </div>

        <div class="flex w-full justify-center items-center p-20">
          <Button
            variant="default"
            onClick={() => navigate("/asteroid/render")}
          >
            {"< Go Back"}
          </Button>
        </div>
      </div>
    </div>
  );
}
