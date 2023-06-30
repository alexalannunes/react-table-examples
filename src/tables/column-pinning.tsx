import {
  Box,
  Button,
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
  ColumnOrderState,
  VisibilityState,
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
  const [data] = useState(() => makeData(8));
  const [columns] = useState(() => [...defaultColumns]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnPinning, setColumnPinning] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
      columnPinning,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
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
            <Text as="strong">Toggle all</Text>
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
      </Card>

      <Flex direction="column" gap={2}>
        <Table size={"sm"}>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} colSpan={header.colSpan}>
                    <Flex gap={1} direction="column">
                      <Box data-testid="dkd">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </Box>
                      <Flex gap={1}>
                        {!header.isPlaceholder &&
                        header.column.getIsPinned() ? (
                          <Button
                            size="xs"
                            onClick={() => {
                              header.column.pin(false);
                            }}
                          >
                            X
                          </Button>
                        ) : null}
                        {!header.isPlaceholder && header.column.getCanPin() && (
                          <>
                            {header.column.getIsPinned() !== "left" ? (
                              <Button
                                onClick={() => {
                                  header.column.pin("left");
                                }}
                                size="xs"
                              >
                                {"<="}
                              </Button>
                            ) : null}
                            {header.column.getIsPinned() !== "right" ? (
                              <Button
                                onClick={() => {
                                  header.column.pin("right");
                                }}
                                size="xs"
                              >
                                {"=>"}
                              </Button>
                            ) : null}
                          </>
                        )}
                      </Flex>
                    </Flex>
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
        <Box>
          <Code>{JSON.stringify(table.getState().columnPinning)}</Code>
        </Box>
      </Flex>
    </Flex>
  );
}
