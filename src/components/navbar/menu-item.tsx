import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useTableListDispatch } from "../../context";
import { IRoute } from "../../types/routes";

interface Props {
  item: IRoute;
}
export function MenuItem({ item }: Props) {
  const navigate = useNavigate();

  const tableListDispatch = useTableListDispatch();

  const { pathname } = useLocation();

  const isActive = item.path === pathname;

  const goToTable = (route: IRoute) => {
    tableListDispatch(route);
    navigate(route.path);
  };

  return (
    <Button
      isActive={isActive}
      justifyContent="flex-start"
      onClick={() => goToTable(item)}
      variant="ghost"
    >
      {item.label}
    </Button>
  );
}
