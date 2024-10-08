import GetAllEmpreendimento from "@/actions/empreendimento/service/getAllEmpreendimentos";
import Empreendimentos from "@/app/componentes/empreendimentoCard";
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "EMPREENDIMENTOS",
};
export default async function EmpreendimentoPage() {

  const dados = await GetAllEmpreendimento();

  return (
    <>
      <Flex
        w={"100%"}
        minH={"90.9dvh"}
        px={{ base: 2, md: "10rem" }}
        py={5}
        flexDir={"column"}
      >
        <Flex w={"100%"} justifyContent={"space-around"}>
          <Heading>Empreendimentos</Heading>
          <Link
            href={"/empreendimentos/cadastrar"}
            _hover={{ textDecoration: "none" }}
          >
            <Box
              py={2}
              px={7}
              border="3px solid green.600"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500" }}
              boxShadow={"lg"}
              cursor={"pointer"}
            >
              Criar Empreendimento
            </Box>
          </Link>
        </Flex>
        <Divider my={5} />
        <Box ml={4}>
          <Text fontSize="25px" fontWeight="bold" color="#333333">
            EMPREENDIMENTOS CADASTRADOS
          </Text>
        </Box>
        <Box w={"100%"}>
          <Flex
            w={"100%"}
            mb={8}
            justifyContent="center"
            alignItems="center"
          ></Flex>
          <Box>{dados?.status === 200 ? <Empreendimentos data={dados?.data} /> : <></>}</Box>
        </Box>
      </Flex>
    </>
  );
}
