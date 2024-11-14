import {  Box, Flex, SimpleGrid, VStack, Text } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PAINEL ADMINISTRATIVO"
};

export default async function PainelAdministrativo() {
    const fetchData = async () => {
        const response = await fetch('http://localhost:3030/bot/atualiza/infos/global', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    };

    const data = await fetchData();
    console.log("🚀 ~ PainelAdministrativo ~ data:", data)

  return (
    <>
      <Flex w={"100%"} px={{ base: 2, md: "10rem" }} py={5} flexDir={"column"}>
      <VStack spacing={8} p={5}>
      <Text fontSize="3xl" fontWeight="bold" color="blue.500">Dashboard de Solicitações</Text>

      <SimpleGrid columns={[1, 2]} spacing={10} w="full">
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
          <Text fontSize="xl" mb={3} color="gray.600">Total de Solicitações</Text>
          {/* <Bar data={barData} /> */}
        </Box>

        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
          <Text fontSize="xl" mb={3} color="gray.600">Média de Horas</Text>
          {/* <Bar data={avgHoursData} /> */}
        </Box>

        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white" colSpan={[1, 2]}>
          <Text fontSize="xl" mb={3} color="gray.600">Distribuição de Tipos de Solicitação</Text>
          {/* <Pie data={pieData} /> */}
        </Box>
      </SimpleGrid>
    </VStack>
      </Flex>
    </>
  );
}
