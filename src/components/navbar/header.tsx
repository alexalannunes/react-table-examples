import { Heading } from "@chakra-ui/react";

export function MenuHeader() {
  return (
    <Heading
      m={0}
      size="sm"
      h={14}
      alignItems="center"
      display="flex"
      borderBottom="1px"
      borderBottomColor="gray.100"
      pl={4}
    >
      Tables
    </Heading>
  );
}
