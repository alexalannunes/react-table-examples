import { EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  Cell,
  ColumnDef,
  Row,
  Table as TableType,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

function currency(number: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
}

export interface IMoney {
  cart: string;
  [key: string]: string | number;
}

const data: IMoney[] = [
  {
    cart: "nubank",
    alex: 100,
    aline: 100,
    viviane: 100,
  },
  {
    cart: "willbank",
    alex: 100,
    aline: 100,
    viviane: 100,
  },
  {
    cart: "saraiva",
    alex: 100,
    aline: 100,
    viviane: 0,
  },
];

const peoples = [
  {
    name: "alex",
    value: 100,
  },
  {
    name: "aline",
    value: 100,
  },
  {
    name: "viviane",
    value: 100,
  },
];

function EditableCell<TData>({
  value,
  cell,
  row,
  table,
}: {
  value: number;
  cell: Cell<TData, any>;
  row: Row<TData>;
  table: TableType<IMoney>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    if (table.options?.meta?.setDynamicData) {
      table.options?.meta?.setDynamicData((prev) => {
        return prev.map((item, index) => {
          if (index === row.index) {
            return {
              ...prev[index],
              [cell.column.id]: Number(newValue),
            };
          }
          return item;
        });
      });
    }
  };
  if (isEditing) {
    return (
      <Input
        autoFocus
        size="sm"
        type="number"
        step={0.01}
        w="32"
        value={newValue}
        onChange={(ev) => setNewValue(Number(ev.target.value))}
        min={0}
        placeholder="R$"
        onBlur={handleBlur}
      />
    );
  }
  return (
    <Flex onClick={() => setIsEditing(true)} gap={2}>
      <EditIcon color="gray.600" />
      <Text as="span" color={value < 100 ? "green.500" : "gray.900"}>
        {currency(value)}
      </Text>
    </Flex>
  );
}

const otherColumns: ColumnDef<IMoney>[] = peoples.map((item) => ({
  accessorFn: (row) => {
    const value = row[item.name];
    return value;
  },
  id: item.name,
  cell: ({ getValue, cell, row, table }) => (
    <EditableCell
      value={getValue<number>()}
      cell={cell}
      row={row}
      table={table}
    />
  ),
  footer: (props) => {
    const rows = props.table.getCoreRowModel().rows;
    const sum = rows.reduce(
      (acc, curr) => acc + Number(curr.original[props.column.id]),
      0
    );
    return currency(sum);
  },
}));

const isNumeric = (columnId: string) => {
  return ["total"].includes(columnId);
};

const defaultColumns: ColumnDef<IMoney>[] = [
  {
    accessorKey: "cart",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  ...otherColumns,
  {
    cell: (cell) => {
      const row = cell.row.original;

      let sum = 0;

      for (const key in row) {
        if (typeof row[key] === "number") {
          sum += row[key] as number;
        }
      }

      return currency(sum);
    },
    id: "total",
    header: "Total",
    footer(cell) {
      const rows = cell.table.getCoreRowModel().rows;

      let sum = 0;

      rows.forEach(({ original }) => {
        for (const key in original) {
          if (typeof original[key] === "number") {
            sum += original[key] as number;
          }
        }
      });

      return currency(sum);
    },
  },
];

export function BasicDynamicColumnTable() {
  const [items, setItems] = useState(() => data);
  const [columns] = useState(() => [...defaultColumns]);
  const table = useReactTable<any>({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      setDynamicData: setItems,
    },
  });

  return (
    <>
      <Table variant="simple" size="sm">
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
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </>
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
        <Tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <Tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <Th key={header.id} isNumeric={isNumeric(header.column.id)}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Tfoot>
      </Table>
    </>
  );
}
