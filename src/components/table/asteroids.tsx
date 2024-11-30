import { ColumnDef, createColumnHelper } from "@tanstack/solid-table";

import { Table } from "~/components/table";

//TODO types
type Asteroid = any;
type Props = {
  data: Array<Asteroid>;
};

const columnHelper = createColumnHelper<Asteroid>();

const columns: ColumnDef<Asteroid, any>[] = [
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
      <div class="flex justify-center">{String(info.getValue())}</div>
    ),
  }),
];

export default function AsteroidTable(props: Props) {
  return <Table data={props.data} columns={columns} />;
}
