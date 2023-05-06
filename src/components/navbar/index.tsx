import { Box } from "@chakra-ui/react";
import { MenuHeader } from "./header";
import { MenuList } from "./menu";

export function MenuTables() {
  return (
    <Box w="260px" borderRight="1px" borderRightColor="gray.100">
      <MenuHeader />
      <MenuList />
    </Box>
  );
}
