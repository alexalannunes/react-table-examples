import { EditIcon } from "@chakra-ui/icons";
import {
  Code,
  Flex,
  HStack,
  IconButton,
  Input,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

function EditableCell({
  initial,
  rowIndex,
  columnId,
  setData,
}: {
  initial: string;
  rowIndex: number;
  columnId: string;
  setData: React.Dispatch<React.SetStateAction<IPerson[]>>;
}) {
  const [value, setValue] = useState(initial);
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    setData((prev) => {
      return prev.map((item, index) => {
        if (index === rowIndex) {
          return {
            ...prev[index],
            user: {
              ...item.user,
              firstName: value,
            },
          };
        }
        return item;
      });
    });
    setIsEditing(false);
  };
  if (!isEditing) {
    return (
      <HStack>
        <Text>{value}</Text>
        <IconButton
          aria-label="Edit"
          size="xs"
          icon={<EditIcon />}
          onClick={() => setIsEditing(true)}
        />
      </HStack>
    );
  }
  return (
    <Input
      size="sm"
      value={value}
      onBlur={handleBlur}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
interface IPerson {
  user: {
    firstName: string;
    lastName: string;
  };
  tasks: number;
  completed: number;
  pending: number;
}

const data: IPerson[] = [
  {
    user: {
      firstName: "alex",
      lastName: "alan nunes",
    },
    tasks: 31,
    completed: 14,
    pending: 17,
  },
  {
    user: {
      firstName: "viviane",
      lastName: "nogueira",
    },
    tasks: 24,
    completed: 3,
    pending: 21,
  },
];

const columnHelper = createColumnHelper<IPerson>();

const isNumeric = (columnId: string) => {
  return ["completed", "pending", "progress"].includes(columnId);
};

export function BasicTable() {
  const [items, setItems] = useState(() => data);
  const columns = useMemo(() => {
    return [
      columnHelper.group({
        header: "Info",
        columns: [
          columnHelper.accessor("user.firstName", {
            cell: (info) => {
              const initial = info.getValue() as string;
              return (
                <EditableCell
                  rowIndex={info.row.index}
                  columnId={info.column.id}
                  initial={initial}
                  setData={setItems}
                />
              );
            },
            header: "First name",
            meta: {
              info: "meta",
            },
          }),
          columnHelper.accessor("user.lastName", {
            cell: (info) => info.getValue(),
            header: "First name",
          }),
        ],
      }),
      columnHelper.group({
        header: "Work",
        columns: [
          columnHelper.accessor("tasks", {
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("completed", {
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("pending", {
            cell: (info) => info.getValue(),
          }),
          columnHelper.display({
            id: "progress",
            header: "Progress",
            cell: (props) => {
              const total = props.row.original.tasks;
              const completed = props.row.original.completed;
              const percentage = (completed * 100) / total;
              let value = 0;
              if (!total) {
                return value;
              }
              value = Number(percentage.toFixed(0));
              return (
                <Flex direction="column">
                  <Text>{value}%</Text>
                  <Progress h={1.5} max={100} rounded="full" value={value} />
                </Flex>
              );
            },
          }),
        ],
      }),
    ];
  }, []);
  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
                      {" - "}
                      {header.getContext().column.columnDef.meta?.info}
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
      </Table>
      <Code>{JSON.stringify(items)}</Code>
    </>
  );
}
