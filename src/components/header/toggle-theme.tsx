import { Button, useColorMode } from "@chakra-ui/react";

export function ToggleTheme() {
  const { toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} size="sm">
      theme
    </Button>
  );
}
