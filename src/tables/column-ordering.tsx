import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Person, makeData } from "../data/make-data";
import { faker } from "@faker-js/faker";

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

export function ColumnOrderingTable() {
  const [data] = useState(() => makeData(20));
  const [columns] = useState(() => [...defaultColumns]);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const randomizeColumns = () => {
    table.setColumnOrder(
      faker.helpers
        .shuffle(table.getAllLeafColumns())
        .map((column) => column.id)
    );
  };

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

        <CardFooter>
          <Button onClick={randomizeColumns}>Shuffle columns</Button>
        </CardFooter>
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
