import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

type Props = {
  params: { id: string };
};
export default function NewChamadoPage({ params }: Props) {
  const { id } = params;

  return (
    <Flex
      w="100%"
      h="88.6vh"
      bg="gray.500"
      p={4}
      gap={4}
      flexDir={{ base: "column", md: "row" }}
    >
      <Box
        w={{ base: "100%", md: "70%" }}
        h={"100%"}
        bg="white"
        borderRadius="1rem"
        boxShadow="md"
        border="1px solid"
        borderColor="gray.200"
        p={4}
      >
        <Flex gap={3} pl={8} alignItems="end" justifyContent="flex-start">
          <Heading>Chamado</Heading>
          <Heading size="lg">Id: {id}</Heading>
        </Flex>
        <Divider my={4} />
        <Flex w="100%">
          <Flex gap={2}>
            <Text>Descrição</Text>
          </Flex>
        </Flex>

      </Box>
      <Flex w={{ base: "100%", md: "30%" }} h={"100%"} flexDir="column" gap={4}>
        <Box
          h={"65%"}
          w={"100%"}
          bg="gray.100"
          borderRadius="1rem"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
          p={4}
        >
          {" "}
          mensagem
        </Box>
        <Box
          h={"35%"}
          w={"100%"}
          bg="gray.100"
          borderRadius="1rem"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
          p={4}
          overflowY="auto"
        >
          {" "}
          alertas
        </Box>
      </Flex>
    </Flex>
  );
}
