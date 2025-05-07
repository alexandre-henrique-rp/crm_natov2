import { BugReport } from "@/components/bug";
import { FilterRoute } from "@/components/filter/filtro_route";
import PerfilHome from "@/components/perfil_home";
import ModalPrimeAsses from "@/components/prime_asses";
import TermosPage from "@/components/termos";
import { Box, Flex } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOME",
  description: "sistema de gestão de vendas de imóveis",
};

export default async function HomePage() {
  return (
    <Flex
      minH="100vh"
      w="100%"
      justifyContent="center"
      bg="#F8F8F8"
      py="2rem"
    >
      <ModalPrimeAsses />
      <TermosPage />
      <Box
        w={{ base: "98%", xl: "80%" }}
        justifyContent="space-between"
      >
        <BugReport />
        <Box justifyContent="center" alignItems="center">
          <PerfilHome />
        </Box>
        <Box>
          <FilterRoute />
        </Box>
      </Box>
    </Flex>
  );
}
