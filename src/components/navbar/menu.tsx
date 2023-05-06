import { Stack } from "@chakra-ui/react";
import { MenuItem } from "./menu-item";
import { routes } from "../../routes/route-setup";

export function MenuList() {
  return (
    <Stack p={4}>
      {routes.map((item) => (
        <MenuItem key={item.path} item={item} />
      ))}
    </Stack>
  );
}
