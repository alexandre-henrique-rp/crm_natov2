"use client";
import { BotaoRetorno } from "@/components/botoes/btm_retorno";
import Financeiras from "@/components/financeirasCard";
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function PainelFinanceiro() {
  const [dados, setDados] = useState<any[]>([]);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const req = await fetch("/api/financeira/getall");
      if (!req.ok) {
        setDados([]);
      }
      const res = await req.json();
      setDados(res);
    } catch (error) {
      console.error("Erro ao buscar dados das construtoras:", error);
      setDados([]);
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
          <Flex gap={2}>
            <Box zIndex={1} alignSelf="baseline" position="initial">
              <BotaoRetorno rota="/" />
            </Box>
            <Heading> </Heading>
          </Flex>
          <Flex gap={5}>
            <Link
              href={"/financeiras/cadastrar"}
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
                Criar Financeira
              </Box>
            </Link>
          </Flex>
        </Flex>
        <Divider my={5} />
        <Box ml={4}>
          <Text fontSize="25px" fontWeight="bold" color="#333333">
            FINANCEIRAS CADASTRADAS
          </Text>
        </Box>
        <Box w={"100%"}>
          <Flex
            w={"100%"}
            mb={8}
            justifyContent="center"
            alignItems="center"
          ></Flex>
          <Box>{dados ? <Financeiras data={dados} /> : <></>}</Box>
        </Box>
      </Flex>
    </>
  );
}
