import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import {
  ColumnDef,
  ColumnResizeMode,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Person, makeData } from "../data/make-data";
import { ChevronDownIcon } from "@chakra-ui/icons";

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

const isNumeric = (columnId: string) => {
  return ["completed", "pending", "progress"].includes(columnId);
};

export function ColumnSizingTable() {
  const [items] = useState(() => makeData(10));
  const [columns] = useState(() => [...defaultColumns]);
  const [columnResizeMode, setColumnResizeMode] =
    useState<ColumnResizeMode>("onChange");

  const table = useReactTable({
    data: items,
    columns,
    columnResizeMode,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <VStack align="flex-start">
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Resize mode "{columnResizeMode}"
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuOptionGroup
            value={columnResizeMode}
            title="Resize mod"
            type="radio"
            onChange={(ev) => setColumnResizeMode(ev as ColumnResizeMode)}
          >
            <MenuItemOption value="onChange">onChange</MenuItemOption>
            <MenuItemOption value="onEnd">onEnd</MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <Table
        variant="simple"
        className="table-column-sizing"
        size="sm"
        style={{
          width: table.getCenterTotalSize(),
        }}
      >
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  colSpan={header.colSpan}
                  isNumeric={isNumeric(header.column.id)}
                  style={{
                    width: header.getSize(),
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </>
                  )}
                  <Box
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer ${
                      header.column.getIsResizing() ? "isResizing" : ""
                    }`}
                    style={{
                      transform:
                        columnResizeMode === "onEnd" &&
                        header.column.getIsResizing()
                          ? `translateX(${
                              table.getState().columnSizingInfo.deltaOffset
                            }px)`
                          : "",
                    }}
                  />
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
      </Table>

      <div className="overflow-x-auto">
        <div
          {...{
            className: "divTable",
            style: {
              width: table.getTotalSize(),
            },
          }}
        >
          <div className="thead">
            {table.getHeaderGroups().map((headerGroup) => (
              <div
                {...{
                  key: headerGroup.id,
                  className: "tr",
                  style: {
                    position: "relative",
                  },
                }}
              >
                {headerGroup.headers.map((header) => (
                  <div
                    {...{
                      key: header.id,
                      className: "th",
                      style: {
                        position: "absolute",
                        left: header.getStart(),
                        width: header.getSize(),
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`,
                        style: {
                          transform:
                            columnResizeMode === "onEnd" &&
                            header.column.getIsResizing()
                              ? `translateX(${
                                  table.getState().columnSizingInfo.deltaOffset
                                }px)`
                              : "",
                        },
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            {...{
              className: "tbody",
            }}
          >
            {table.getRowModel().rows.map((row) => (
              <div
                {...{
                  key: row.id,
                  className: "tr",
                  style: {
                    position: "relative",
                  },
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <div
                    {...{
                      key: cell.id,
                      className: "td",
                      style: {
                        position: "absolute",
                        left: cell.column.getStart(),
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </VStack>
  );
}
