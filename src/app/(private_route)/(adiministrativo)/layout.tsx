import BotaoAdm from "@/components/botoes/bt_adm";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PAINEL ADMINISTRATIVO",
};

export default async function PainelAdmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Flex
        w={"100%"}
        h={"100%"}
        p={{ base: 0, md: 3 }}
        pt={{ base: 3, md: 3 }}
        gap={{ base: 0, md: 3 }}
        justifyContent={"space-between"}
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex w={{ base: "100%", md: "10%" }} minW={"10%"} h={"100%"} flexDir={"column"}>
          <Box w={"100%"}>
            <Text color={"gray.400"} fontSize={"xl"} textAlign={"center"}>
              Gerenciamento
            </Text>
          </Box>
          <Divider
            my={5}
            border={"1px solid"}
            borderColor={"gray.300"}
            w={"100%"}
          />
          <Flex
            flexDir={{ base: "row", md: "column" }}
            w={"100%"}
            gap={2}
            flexWrap={{ base: "wrap", md: "nowrap" }}
            justifyContent={{ base: "center", md: "normal" }}
            alignItems={{ base: "center", md: "normal" }}
          >
            <BotaoAdm name={"Home"} />
            <BotaoAdm name={"Painel"} />
            <BotaoAdm name={"Usuarios"} />
            <BotaoAdm name={"Empreendimentos"} />
            <BotaoAdm name={"Construtora"} />
            <BotaoAdm name={"CCAs"} />
          </Flex>
        </Flex>
        <Flex w={{ base: "100%", md: "90%" }} minW={"90%"} h={"100%"}>
          {children}
        </Flex>
      </Flex>
    </>
  );
}
