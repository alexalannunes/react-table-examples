import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    info?: string;
  }
  interface TableMeta {
    setDynamicData?: React.Dispatch<React.SetStateAction<IMoney[]>>;
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}
