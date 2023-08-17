import { IRoute } from "../types/routes";
import { BasicTable } from "../tables/basic";
import { BasicDynamicColumnTable } from "../tables/basic-dynamic-columns";
import { ColumnOrderingTable } from "../tables/column-ordering";
import { ColumnOrderingDnDTable } from "../tables/column-ordering-dnd";
import { ColumnPinningTable } from "../tables/column-pinning";
import { ColumnSizingTable } from "../tables/column-sizing";
import { ColumnVisibilityTable } from "../tables/column-visibility";
import { EditableDataTable } from "../tables/editable-data";

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
  {
    label: "Column sizing",
    path: "/column-sizing",
    element: <ColumnSizingTable />,
  },
  {
    label: "Column visibility",
    path: "/column-visibility",
    element: <ColumnVisibilityTable />,
  },
  {
    label: "Editable data",
    path: "/editable-data",
    element: <EditableDataTable />,
  },
];

export { routes };
