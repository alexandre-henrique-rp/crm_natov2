'use client'
import { Box, Flex, IconButton, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { FaCopy } from "react-icons/fa6";
import { mask } from "remask";
import React from "react";
import { BtnEditarFinanceira } from "../btn_editar_financeiras";
import { BtnExcluirFinanceira } from "../btn_excluir_financeira";
import { BtnEditarEmpreendimento } from "../btn_editarEmpreendimento";
import { BtnExcluirEmpreendimento } from "../btn_excluir_empreendimento";

interface FinanceirasType {
  data: any;
}

export default function Empreendimentos({ data }: FinanceirasType) {
  const [Empreendimentos, setEmpreendimentos] = useState<any[]>([]);
  const toast = useToast();

  useEffect(() => {
    setEmpreendimentos(data);
      
    }, [data]);

  return (
    <>
      <Flex
        w={"100%"}
        mb={8}
        justifyContent="center"
        alignItems="center"
      ></Flex>
      <Flex gap={4} flexWrap={"wrap"}>
        {Empreendimentos.map((solicitacao: any) => {
          return (
            <Box
              key={solicitacao.id}
              border="3px solid #E8E8E8"
              borderRadius="8px"
              p={3}
              flexDir="column"
              w={{ base: "100%", md: "30%", lg: "20em" }}
              fontSize={"0.8rem"}
            >
              <Flex w="100%" flexDir={"column"} gap={4}>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    ID:
                  </Text>
                  {solicitacao.id}
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    NOME:
                  </Text>
                  {solicitacao.nome}
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                     UF:
                  </Text>
                  {solicitacao.uf}
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    CIDADE:
                  </Text>
                  {solicitacao.cidade}
                </Flex>

              </Flex>
              <Flex mt={3} gap={2} w="100%" justifyContent="end">
                <BtnEditarEmpreendimento id={solicitacao.id} />
                <BtnExcluirEmpreendimento id={solicitacao.id} />
              </Flex>
            </Box>
          );
        })}
      </Flex>
    </>
  );
}
