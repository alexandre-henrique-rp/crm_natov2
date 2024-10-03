import FiltroId from "@/app/componentes/filter_id";
import FiltroUser from "@/app/componentes/filtroUser";
import Usuarios from "@/app/componentes/usuarios_component";
import { auth } from "@/lib/auth_confg";
import UserProvider from "@/provider/UserProvider";
import { Box, Button, Divider, Flex, Heading, Input, InputGroup, InputLeftAddon, Link, Text } from "@chakra-ui/react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";


export const metadata: Metadata = {
  title: "EMPREENDIMENTOS",
};
export default async function UsuariosPage() {

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
            href={"/empreendimento/cadastrar"}
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
        </Box>
      </Flex>
    </>
  );
}

