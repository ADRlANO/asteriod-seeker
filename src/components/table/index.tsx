import {
  ColumnDef,
  createSolidTable,
  flexRender,
  getCoreRowModel,
  TableOptions,
} from "@tanstack/solid-table";

type TableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
};

export function Table<TData>(props: TableProps<TData>) {
  const options: TableOptions<TData> = {
    get data() {
      return props.data;
    },
    get columns() {
      return props.columns;
    },
    getCoreRowModel: getCoreRowModel(),
  };

  const table = createSolidTable(options);

  return (
    <table class="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr>
            {headerGroup.headers.map((header) => (
              <th>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr>
            {row.getVisibleCells().map((cell) => (
              <td>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr>
            {footerGroup.headers.map((header) => (
              <th>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}
