import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Table as ChakraTable,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  Column,
  ColumnDef,
  Table,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Person, makeData } from "../data/make-data";

const isNumeric = (columnId: string) => {
  return ["completed", "pending", "progress"].includes(columnId);
};

const defaultColumn: Partial<ColumnDef<Person>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
      table.options.meta?.updateData?.(index, id, value);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <Input
        size="sm"
        rounded="md"
        value={String(value)}
        onChange={(ev) => setValue(ev.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

function Filter<TData extends Person>({
  column,
  table,
}: {
  column: Column<TData>;
  table: Table<TData>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0].getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const showInputNumber = typeof firstValue === "number";

  if (showInputNumber) {
    return (
      <Flex alignItems="center">
        <NumberInput
          size="sm"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(newValue) => {
            column.setFilterValue((old: [number, number]) => [
              newValue,
              old?.[1],
            ]);
          }}
        >
          <NumberInputField placeholder="min" rounded="md" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        -
        <NumberInput
          size="sm"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(newValue) => {
            column.setFilterValue((old: [number, number]) => [
              old?.[0],
              newValue,
            ]);
          }}
        >
          <NumberInputField placeholder="max" rounded="md" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
    );
  }

  return (
    <Input
      placeholder={`Filter ${column.id}`}
      size="sm"
      rounded="md"
      value={(columnFilterValue ?? "") as string}
      onChange={(ev) => {
        column.setFilterValue(ev.target.value);
      }}
    />
  );
}

export function EditableDataTable() {
  const [data, setData] = useState(() => makeData(100));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: "Name",
        footer: (props) => props.column.id,
        columns: [
          {
            header: "F. Name",
            accessorKey: "firstName",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "lastName",
            header: "L. Name",
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "Info",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "age",
            header: () => "Age",
            footer: (props) => props.column.id,
          },
          {
            header: "More Info",
            columns: [
              {
                accessorKey: "visits",
                header: () => <span>Visits</span>,
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "status",
                header: "Status",
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "progress",
                header: "Profile Progress",
                footer: (props) => props.column.id,
              },
            ],
          },
        ],
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // default 10
    getFilteredRowModel: getFilteredRowModel(),
    defaultColumn,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) => {
          return old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[index],
                [columnId]: value,
              };
            }
            return row;
          });
        });
      },
    },
    debugTable: true,
  });

  const refreshData = () => {
    setData(() => makeData(100));
  };

  return (
    <Stack>
      <ChakraTable variant="simple" size="sm">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  colSpan={header.colSpan}
                  isNumeric={isNumeric(header.column.id)}
                >
                  {header.isPlaceholder ? null : (
                    <Flex direction="column">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanFilter() && (
                        <Filter column={header.column} table={table} />
                      )}
                    </Flex>
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
                <Td key={cell.id} isNumeric={isNumeric(cell.column.id)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
      <HStack>
        <IconButton
          icon={<ArrowLeftIcon />}
          aria-label="Start page"
          size="sm"
          isDisabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
        />
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Previous"
          size="sm"
          isDisabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        />
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Next"
          size="sm"
          isDisabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        />
        <IconButton
          icon={<ArrowRightIcon />}
          aria-label="Last Page"
          size="sm"
          isDisabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        />
        <Text>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </Text>
        <Box h="6">
          <Divider orientation="vertical" />
        </Box>
        <HStack>
          <Text>Goto page: </Text>
          <NumberInput
            min={1}
            max={table.getPageCount()}
            w={16}
            rounded="md"
            size="sm"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(value) => {
              const page = value ? Number(value) - 1 : 0;
              table.setPageIndex(page);
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <Menu>
          <MenuButton size="sm" as={Button} rightIcon={<ChevronDownIcon />}>
            Show {table.getState().pagination.pageSize}
          </MenuButton>
          <MenuList>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <MenuItem
                key={pageSize}
                onClick={() => {
                  table.setPageSize(pageSize);
                }}
              >
                {pageSize}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Box h="6">
          <Divider orientation="vertical" />
        </Box>
        <Button size="sm" onClick={refreshData}>
          Refresh data
        </Button>
      </HStack>
    </Stack>
  );
}
