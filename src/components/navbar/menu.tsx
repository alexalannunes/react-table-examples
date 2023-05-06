import { Stack } from "@chakra-ui/react";
import { MenuItem } from "./menu-item";
import { links } from "../../constants/routes";

export function MenuList() {
  return (
    <Stack p={4}>
      {links.map((item) => (
        <MenuItem key={item.path} item={item} />
      ))}
    </Stack>
  );
}
