import {
  Button,
  Code,
  Flex,
  Table as TableUI,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  Column,
  ColumnDef,
  ColumnOrderState,
  Header,
  Table,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Person, makeData } from "../data/make-data";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const defaultColumns: ColumnDef<Person>[] = [
  {
    accessorKey: "firstName",
    cell: (info) => info.getValue(),
    id: "firstName",
  },
  {
    accessorKey: "lastName",
    cell: (info) => info.getValue(),
    id: "lastName",
  },
  {
    accessorKey: "age",
    cell: (info) => info.getValue(),
    id: "age",
  },
  {
    accessorKey: "visits",
    cell: (info) => info.getValue(),
    id: "visits",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => info.getValue(),
    id: "status",
  },
  {
    accessorKey: "progress",
    header: "Profile Progress",
    cell: (info) => info.getValue(),
    id: "progress",
  },
];

function reOrderColumn(
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
  );
  return [...columnOrder];
}

interface TableHeaderProps {
  header: Header<Person, unknown>;
  table: Table<Person>;
}

function DraggableColumnHeader({ header, table }: TableHeaderProps) {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [, dropRef] = useDrop({
    accept: "column",
    drop: (draggableColumn: Column<Person>) => {
      const newColumnOrder = reOrderColumn(
        draggableColumn.id,
        column.id,
        columnOrder
      );

      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });

  return (
    <>
      <Th ref={dropRef} colSpan={header.colSpan} opacity={isDragging ? 0.5 : 1}>
        <Flex
          ref={previewRef}
          justifyContent="space-between"
          alignItems="center"
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
          <Button size="xs" ref={dragRef}>
            🟰
          </Button>
        </Flex>
      </Th>
    </>
  );
}

export function ColumnOrderingDnDTable() {
  const [data] = useState(() => makeData(10));
  const [columns] = useState(() => [...defaultColumns]);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => column.id as string)
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnOrderChange: setColumnOrder,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const resetOrder = () =>
    setColumnOrder(columns.map((column) => column.id as string));

  return (
    <DndProvider backend={HTML5Backend}>
      <Button onClick={resetOrder}>Reset order</Button>
      <TableUI mt={1} size={"sm"}>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <DraggableColumnHeader
                  key={header.id}
                  header={header}
                  table={table}
                />
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
      </TableUI>
      <Code>{JSON.stringify(table.getState().columnOrder, null, 2)}</Code>
    </DndProvider>
  );
}
