import BotaoAdm from "@/components/botoes/bt_adm";
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
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
        gap={{ base: 0, md: 3 }}
        justifyContent={"space-between"}
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex
          w={{ base: "100%", md: "10%" }}
          h={"100%"}
          flexDir={"column"}
        >
          <Box w={"100%"} mx={{ base: 0, md: 5 }}>
            <Text color={"gray.400"} fontSize={"xl"} textAlign={"center"}>
              Gerenciamento
            </Text>
          </Box>
          <Divider
            // m={{base: 0, md: 5}}
            my={5}
            border={"1px solid"}
            borderColor={"gray.300"}
            w={"100%"}
          />
          <Flex
            flexDir={{ base: "row", md: "column" }}
            w={"100%"}
            mx={{ base: 0, md: 5 }}
            gap={"1rem"}
            flexWrap={{ base: "wrap", md: "nowrap" }}
            justifyContent={{ base: "center", md: "normal" }}
            alignItems={{ base: "center", md: "normal" }}
          >
            <BotaoAdm name={"Usuarios"} />
            <BotaoAdm name={"Empreendimentos"} />
            <BotaoAdm name={"Construtora"} />
            <BotaoAdm name={"CCAs"} />
          </Flex>
        </Flex>
        <Flex w={{ base: "100%", md: "90%" }} h={"100%"}>
          {children}
        </Flex>
      </Flex>
    </>
  );
}
