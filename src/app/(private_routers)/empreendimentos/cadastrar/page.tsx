import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import { CardCreateUpdate } from "@/app/implementes/cardCreateUpdate";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import BotaoCancelar from "@/app/componentes/btn_cancelar";
import { Metadata } from "next";
import EmpreendimentoProvider from "@/provider/EmpreendimentoProvider";
import { CreateEmpreendimento } from "@/actions/empreendimento/service/createEmpreendimento";


export const metadata: Metadata = {
  title: "CADASTRO DE EMPREENDIMENTO",
};

export default async function CadastrarEmpreendimento() {


  return (
    <>
      <Flex
        w={"100%"}
        minH={"90.9dvh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          w={"70%"}
          bg={"gray.50"}
          borderRadius={"1rem"}
          boxShadow={"lg"}
          p={8}
        >
          <Flex justifyContent={"space-between"}>
            <Box>
              <BotaoRetorno rota="/empreendimentos" />
            </Box>
            <Heading>Criar Empreendimento</Heading>
            <Box> </Box>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          <CardCreateUpdate.Form action={CreateEmpreendimento}
          method="POST">
            <Flex w={"full"} flexWrap={"wrap"} gap={5}>
              <EmpreendimentoProvider>
                <CardCreateUpdate.GridEmpreendimentoConstrutora w={"13rem"} />
                <CardCreateUpdate.GridEmpreendimentoNome w={"25rem"} />
                <CardCreateUpdate.GridEmpreendimentoCidade w={"15rem"} />
                <CardCreateUpdate.GridEmpreendimentoUf w={"3rem"} />
                <CardCreateUpdate.GridEmpreendimentoFinanceiro w={"20rem"} />
              </EmpreendimentoProvider>
              <Spacer />
              <Button
                type="submit"
                mt={2}
                alignSelf={"center"}
                colorScheme="green"
                size="lg"
              >
                Salvar
              </Button>
              <BotaoCancelar
                mt={2}
                alignSelf={"center"}
                colorScheme="red"
                variant="outline"
                size="lg"
              />
            </Flex>
            <Divider my={4} borderColor="gray.300" />
            <Flex w={"full"} justifyContent={"end"}></Flex>
          </CardCreateUpdate.Form>
        </Box>
      </Flex>
    </>
  );
}