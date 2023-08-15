import {
  Card,
  CardBody,
  CardHeader,
  Code,
  Divider,
  Flex,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
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

export function ColumnVisibilityTable() {
  const [data] = useState(() => makeData(20));
  const [columns] = useState(() => [...defaultColumns]);

  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <Flex alignItems="flex-start" gap={2}>
      <Card width="64">
        <CardHeader>
          <Flex gap={2} alignItems="center">
            <input
              {...{
                type: "checkbox",
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />
            <Text as="b">Toggle all</Text>
          </Flex>
        </CardHeader>
        <Divider color="gray.200" />
        <CardBody>
          <Stack>
            {table.getAllLeafColumns().map((column) => (
              <Flex gap={2} alignItems="center" key={column.id}>
                <input
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />
                <Text>{column.id}</Text>
              </Flex>
            ))}
          </Stack>
        </CardBody>
        <Divider color="gray.200" />
      </Card>
      <Stack>
        <Code>{JSON.stringify(table.getState().columnVisibility)}</Code>
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
      </Stack>
    </Flex>
  );
}
