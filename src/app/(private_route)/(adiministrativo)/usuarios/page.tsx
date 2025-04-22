"use client";
import FiltroUser from "@/components/filtroUser";
import Usuarios from "@/components/usuarios_component";
import UserProvider from "@/provider/UserProvider";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function UsuariosPage() {
  const [Dados, setDados] = useState([]);
  const toast = useToast();

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const req = await fetch("/api/usuario/getall");
      if (!req.ok) {
        setDados([]);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      const res = await req.json();
      toast({
        title: "Sucesso",
        description: "Dados carregados com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setDados(res);
    } catch (error) {
      console.error("Erro ao buscar dados das construtoras:", error);
      setDados([]);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
          <Heading>Usuários</Heading>
          <Link
            href={"/usuarios/cadastrar"}
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
              Criar Usuário
            </Box>
          </Link>
        </Flex>
        <Divider my={5} />
        <Box ml={4}>
          <Text fontSize="25px" fontWeight="bold" color="#333333">
            USUARIOS CADASTRADOS
          </Text>
        </Box>
        <Box w={"100%"}>
          <UserProvider>
            <Flex w={"100%"} mb={8} justifyContent="center" alignItems="center">
              <FiltroUser />
            </Flex>
            <Box>{Dados ? <Usuarios data={Dados} /> : <></>}</Box>
          </UserProvider>
        </Box>
      </Flex>
    </>
  );
}
