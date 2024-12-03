import { get } from "lodash-es";
import { NASA_API_BASE } from "~/lib/utils/constants";

const baseNeoApiUrl = "https://api.nasa.gov/neo/rest/v1/feed";

export async function fetchAsteroidsByName(name: string) {
  "use server";

  const response = await fetch(
    `${NASA_API_BASE}/asteroid?name=${name}&api_key=${process.env.NASA_API_KEY}`
  );

  http: return await response.json();
}

export async function fetchAsteroidById(id: string) {
  "use server";

  const url = `${NASA_API_BASE}/${id}?api_key=${process.env.NASA_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

type AsteroidParams = {
  start_date: Date;
  end_date: Date;
  search_term: string;
  sort: any;
};

export async function fetchAsteroids(args: AsteroidParams) {
  "use server";
  const startDate = new Date(args.start_date).toISOString().split("T")[0];
  const endDate = new Date(args.end_date).toISOString().split("T")[0];

  const params = {
    end_date: endDate,
    start_date: startDate,
    sort: args.sort,
  };

  const url = new URL(baseNeoApiUrl);

  url.searchParams.append("api_key", process.env.NASA_API_KEY);

  if (params.start_date) {
    url.searchParams.append("start_date", params.start_date);
  }
  if (params.end_date) {
    url.searchParams.append("end_date", params.end_date);
  }

  console.log("FETCH Asteroid Request Params :>> ", params);
  console.log("FETCH Asteroid Request URL :>> ", url);

  const response = await fetch(String(url));
  const data = await response.json();

  const near_earth_objects = Object.values(data.near_earth_objects).flat();

  const sortValue = get(params, "sort.value", "");
  if (sortValue === "ASC") {
    near_earth_objects.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortValue === "DESC") {
    near_earth_objects.sort((a, b) => b.name.localeCompare(a.name));
  }

  console.log("near_earth_objects.length :>> ", near_earth_objects.length);
  return near_earth_objects;
}
