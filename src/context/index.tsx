import { ReactNode, createContext, useContext, useState } from "react";
import { IRoute } from "../types/routes";
import { useLocation } from "react-router-dom";
import { links } from "../constants/routes";

interface ITableListContext extends IRoute {}

type TableListContextDispatchType = React.Dispatch<
  React.SetStateAction<IRoute>
>;

const TableListContext = createContext<ITableListContext>(
  {} as ITableListContext
);

const TableListContextDispatch = createContext<
  TableListContextDispatchType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export function TableListProvider({ children }: Props) {
  const { pathname } = useLocation();

  const [tableRoute, setTableRoute] = useState<IRoute>(() => {
    return links.find((route) => route.path === pathname) as IRoute;
  });

  return (
    <TableListContext.Provider value={tableRoute}>
      <TableListContextDispatch.Provider value={setTableRoute}>
        {children}
      </TableListContextDispatch.Provider>
    </TableListContext.Provider>
  );
}

TableListContext.displayName = "TableListContext";
TableListContextDispatch.displayName = "TableListContextDispatch";

export function useTableList() {
  const context = useContext(TableListContext);
  if (!context) {
    throw new Error("TableList must be inside TableListContext");
  }
  return context;
}

export function useTableListDispatch() {
  const context = useContext(TableListContextDispatch);
  if (!context) {
    throw new Error("TableListDispatch must be inside TableListContext");
  }
  return context;
}
