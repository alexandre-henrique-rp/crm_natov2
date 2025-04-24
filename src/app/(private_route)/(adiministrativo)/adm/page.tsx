"use client";
import CardAdmUsuario from "@/components/adm/card";
import RelatorioFinanceiro from "@/components/adm/financeiro/RelatorioFinanceiro";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { LuBuilding, LuDollarSign, LuFileText, LuUsers } from "react-icons/lu";

export default async function PainelAdministrativo() {
  return (
    <Box w={"100%"} px={4} overflow={"auto"}>
      <Box w={"100%"} borderRadius={"2rem"} boxShadow={"dark-lg"} p={8}>
        <Box w={"100%"}>
          <Heading>Painel Administrativo</Heading>
        </Box>
        <Flex w={"100%"} py={8} justifyContent={"flex-end"} gap={2}>
          <Button>Nova Cobrança</Button>
          <Button>Alerta Geral</Button>
        </Flex>
        <Flex flexDirection={"column"} gap={10} pt={3}>
          <Flex w={"100%"} justifyContent={"space-between"} gap={2}>
            <CardAdmUsuario count={500} title={"Usuários"} icon={<LuUsers size={24} />} />
            <CardAdmUsuario count={50} title={"Construtoras"} icon={<LuBuilding size={24} />} />
            <CardAdmUsuario count={'R$ 324.890'} title={"Cobranças em Aberto"} icon={<LuDollarSign size={24} />} />
            <CardAdmUsuario count={500} title={"Relatórios Gerados"} icon={<LuFileText size={24} />} />
          </Flex>
          <Flex w={"100%"} justifyContent={"space-between"} gap={2}>
            <Box w={"70%"} >
              <RelatorioFinanceiro />
            </Box>
            <Box w={"30%"} bg={"gray.200"} >
              card 2
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
