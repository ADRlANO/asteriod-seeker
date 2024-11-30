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

  console.log("fetchAsteroidById");
  const url = `${NASA_API_BASE}/${id}?api_key=${process.env.NASA_API_KEY}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("data :>> ", data);
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

  const requestURL = constructUrl(baseNeoApiUrl, params);

  // console.log("FETCH Asteroid Request Params :>> ", params);
  // console.log("FETCH Asteroid Request URL :>> ", requestURL);

  console.log("requestURL :>> ", requestURL);
  const response = await fetch(requestURL);
  const data = await response.json();

  const near_earth_objects = Object.values(data.near_earth_objects).flat();

  const near_earth_objects_dates = Object.keys(data.near_earth_objects);
  console.log("near_earth_objects_dates", near_earth_objects_dates);

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

//TODO types
type ISODate = string;
function constructUrl(
  baseURL: string,
  params: { start_date?: ISODate; end_date: ISODate }
) {
  const url = new URL(baseURL);

  url.searchParams.append("api_key", "DEMO_KEY");

  if (params.start_date) {
    url.searchParams.append("start_date", params.start_date);
  }
  if (params.end_date) {
    url.searchParams.append("end_date", params.end_date);
  }

  return String(url);
}
