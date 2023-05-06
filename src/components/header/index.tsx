import { Flex, Heading } from "@chakra-ui/react";
import { ToggleTheme } from "./toggle-theme";
import { useTableList } from "../../context";

export function Header() {
  const { label } = useTableList();

  return (
    <Flex
      h={14}
      borderBottom="1px"
      borderBottomColor="gray.100"
      alignItems="center"
      justifyContent="space-between"
      px={4}
    >
      <Heading m={0} size="sm">
        {label}
      </Heading>
      <ToggleTheme />
    </Flex>
  );
}
