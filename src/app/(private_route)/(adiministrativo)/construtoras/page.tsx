"use client";
import { BotaoRetorno } from "@/components/botoes/btm_retorno";
import Construtora from "@/components/construtora_compoment";

import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function ConstrutoraPage() {
  const [Dados, setDados] = useState<any[]>([]);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const req = await fetch("/api/construtora/getall");
      const res = await req.json();

      const construtorasComCorretores = await Promise.all(
        res.map(async (construtora: any) => {
          const corretoresRes = await fetch(
            `/api/usuario/construtora/${construtora.id}`
          );
          const corretoresJson = await corretoresRes.json();

          return {
            ...construtora,
            corretores: corretoresJson.data || [],
          };
        })
      );

      setDados(construtorasComCorretores);
    } catch (error) {
      console.error("Erro ao buscar dados das construtoras:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Construtoras</title>
        <meta name="description" content="Lista de construtoras cadastradas" />
      </Head>

      <Flex
        w={"100%"}
        minH={"90.9dvh"}
        px={{ base: 2, md: "10rem" }}
        py={5}
        flexDir={"column"}
      >
        <Flex w={"100%"} justifyContent={"space-around"}>
          <Flex gap={2}>
            <Box zIndex={1} alignSelf="baseline" position="initial">
              <BotaoRetorno rota="/" />
            </Box>
            <Heading>Construtora</Heading>
          </Flex>
          <Link
            href={"/construtoras/cadastrar"}
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
              Criar Construtora
            </Box>
          </Link>
        </Flex>
        <Divider my={5} />
        <Box ml={4}>
          <Text fontSize="25px" fontWeight="bold" color="#333333">
            CONSTRUTORA CADASTRADAS
          </Text>
        </Box>
        <Box w={"100%"}>
          {Dados.length === 0 ? (
            <Text>{Dados}</Text>
          ) : (
            <Construtora data={Dados} />
          )}
        </Box>
      </Flex>
    </>
  );
}
