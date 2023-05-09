import { Switch, useColorMode } from "@chakra-ui/react";
import { useState } from "react";

export function ToggleTheme() {
  const { toggleColorMode } = useColorMode();

  const [isDark] = useState(() => {
    const value = localStorage.getItem("chakra-ui-color-mode") as string;
    // TODO: add colorMode from useColorMode
    return value === "dark";
  });

  const handleToggle = () => {
    toggleColorMode();
  };

  return (
    <Switch checked={isDark} defaultChecked={isDark} onChange={handleToggle} />
  );
}
