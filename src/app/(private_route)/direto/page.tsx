import { BugReport } from "@/components/bug";
import { FilterRouteDireto } from "@/components/filter/filter_router_direto";
import ModalPrimeAsses from "@/components/prime_asses";
import TermosPage from "@/components/termos";
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
      alignItems="center"
      bg="#F8F8F8"
      py="2rem"
    >
      <BugReport />
      <ModalPrimeAsses session={session} />
      <TermosPage session={session} />
      <Box
        w={{ base: "98%", xl: "80%" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <FilterRouteDireto session={session} />
        </Box>
      </Box>
    </Flex>
  );
}
