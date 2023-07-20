import { BasicTable } from "../tables/basic";
import { BasicDynamicColumnTable } from "../tables/basic-dynamic-columns";
import { ColumnOrderingTable } from "../tables/column-ordering";
import { ColumnOrderingDnDTable } from "../tables/column-ordering-dnd";
import { ColumnPinningTable } from "../tables/column-pinning";
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
    label: "Dynamic columns",
    path: "/dynamic-columns",
    element: <BasicDynamicColumnTable />,
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
  {
    label: "Column pinning",
    path: "/column-pinning",
    element: <ColumnPinningTable />,
  },
];

export { routes };
