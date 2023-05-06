import { Container, Flex } from "@chakra-ui/react";
import { TableListProvider } from "../context";
import { MenuTables } from "../components/navbar";
import { Header } from "../components/header";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <TableListProvider>
      <Flex minH="100vh">
        <MenuTables />
        <Flex direction="column" flex={1}>
          <Header />
          <Container maxW={"container.lg"} pt={4}>
            <Outlet />
          </Container>
        </Flex>
      </Flex>
    </TableListProvider>
  );
}
