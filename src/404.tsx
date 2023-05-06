import { Center, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <Center minH="100vh">
      <VStack>
        <Heading>Page not found</Heading>
        <Link to="/" replace>
          Back to home
        </Link>
      </VStack>
    </Center>
  );
}
