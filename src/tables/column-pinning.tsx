import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Person, makeData } from "../data/make-data";

const defaultColumns: ColumnDef<Person>[] = [
  {
    header: "Name",
    columns: [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "lastName",
        cell: (info) => info.getValue(),
      },
    ],
  },
  {
    header: "Info",
    columns: [
      {
        accessorKey: "age",
        cell: (info) => info.getValue(),
      },
      {
        header: "More info",
        columns: [
          {
            accessorKey: "visits",
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: "status",
            header: "Status",
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: "progress",
            header: "Profile Progress",
            cell: (info) => info.getValue(),
          },
        ],
      },
    ],
  },
];

export function ColumnPinningTable() {
  const [data] = useState(() => makeData(20));
  const [columns] = useState(() => [...defaultColumns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <Table size={"sm"}>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
