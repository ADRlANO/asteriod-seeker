import { useAsteroid } from "~/lib/queries";

//TODO types
export default function AsteroidByIdUI(props: any) {
  const { query } = useAsteroid(props.params.id);

  // console.log("query.data :>> ", query.data);
  return (
    <div class="bg-slate-700">
      <pre>{JSON.stringify(query.data, null, 2)}</pre>
    </div>
  );
}
