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
    <table class="w-full p-3 border-collapse border border-gray-300">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr>
            {headerGroup.headers.map((header) => (
              <th class="border border-gray-300 px-4 py-2 text-left bg-gray-100">
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
              <td class="border border-gray-300 px-4 py-2">
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
              <th class="border border-gray-300 px-4 py-2 text-left bg-gray-100">
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
