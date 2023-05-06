import { BasicTable } from "../tables/basic";
import { ColumnOrderingTable } from "../tables/column-ordering";
import { ColumnOrderingDnDTable } from "../tables/column-ordering-dnd";
import { IRoute } from "../types/routes";

interface IRouteApp extends IRoute {
  element: JSX.Element;
}

const routes: IRouteApp[] = [
  {
    label: "Basic",
    path: "/",
    element: <BasicTable />,
  },
  {
    label: "Column ordering",
    path: "/column-ordering",
    element: <ColumnOrderingTable />,
  },
  {
    label: "Column ordering DnD",
    path: "/column-ordering-dnd",
    element: <ColumnOrderingDnDTable />,
  },
];

export { routes };
