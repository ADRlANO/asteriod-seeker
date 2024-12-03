import { Show } from "solid-js";
import { Table } from "~/components/table";
import { Button } from "../ui/button";
import { useNavigate } from "@solidjs/router";
import { ColumnDef, createColumnHelper } from "@tanstack/solid-table";

//TODO improve types
type Asteroid = any;
type Props = {
  data: Array<Asteroid>;
};

const columnHelper = createColumnHelper<Asteroid>();

const columns: Array<ColumnDef<Asteroid, any>> = [
  columnHelper.accessor("name", {
    header: () => <span>Name</span>,
    cell: (info) => <div class="flex justify-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor("absolute_magnitude_h", {
    header: () => <span>Magnitude</span>,
    cell: (info) => <div class="flex justify-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor(
    "estimated_diameter.kilometers.estimated_diameter_max",
    {
      header: () => <span>Diameter (km)</span>,
      cell: (info) => (
        <div class="flex justify-center">{info.getValue().toFixed(2)}</div>
      ),
    }
  ),
  columnHelper.accessor("is_potentially_hazardous_asteroid", {
    header: () => <span>Hazardous</span>,
    cell: (info) => (
      <div
        classList={{
          "bg-red-500": info.getValue(),
          "bg-blue-600": !info.getValue(),
        }}
        class="flex justify-center text-white"
      >
        {String(info.getValue()).toUpperCase()}
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span></span>,
    cell: (props) => <RowActions row={props.row.original} />,
  }),
];

export default function AsteroidTable(props: Props) {
  return <Table data={props.data} columns={columns} />;
}

function RowActions(props: { row: Asteroid }) {
  const navigate = useNavigate();
  const user_favourites = useUserFavourites();

  const isAsteroidUserFavorite = () => user_favourites.includes(props.row.id);

  return (
    <div class="flex justify-around">
      <Button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate(`/asteroid/render/${props.row.id}`)}
      >
        See Details
      </Button>

      <Show when={isAsteroidUserFavorite()} fallback={<OutlineStar />}>
        <FillStar />
      </Show>
    </div>
  );
}

function useUserFavourites() {
  return ["2465633", "2440012"];
}

function FillStar(props) {
  return (
    <svg
      fill="#FACC15"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      height="3em"
      width="3em"
      style="overflow: visible; color: #FACC15;"
    >
      <path d="m908.1 353.1-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
    </svg>
  );
}

function OutlineStar(props) {
  return (
    <svg
      fill="#FACC15"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      height="3em"
      width="3em"
      style="overflow: visible; color: #FACC15;"
    >
      <path d="m908.1 353.1-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
    </svg>
  );
}
