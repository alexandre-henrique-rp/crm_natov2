import { BugReport } from "@/components/bug";
import { FilterRoute } from "@/components/filter/filtro_route";
import PerfilHome from "@/components/perfil_home";
import ModalPrimeAsses from "@/components/prime_asses";
import ModalTermos from "@/components/termos";
import { GetSessionServer } from "@/lib/auth_confg";
import { Box, Flex } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOME",
  description: "sistema de gestão de vendas de imóveis",
};

export default async function HomePage() {
  const session = await GetSessionServer();
  
  return (
    <Flex
      minH="100vh"
      w="100%"
      justifyContent="center"
      bg="#F8F8F8"
      py="2rem"
    >
      <ModalPrimeAsses session={session} />
      <ModalTermos session={session} />
      <Box
        w={{ base: "98%", xl: "80%" }}
        justifyContent="space-between"
      >
        <BugReport />
        <Box justifyContent="center" alignItems="center">
          <PerfilHome session={session} />
        </Box>
        <Box>
          <FilterRoute session={session} />
        </Box>
      </Box>
    </Flex>
  );
}
