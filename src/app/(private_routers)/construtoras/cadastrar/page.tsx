'use client';
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
import CreateConstrutora from "@/actions/construtora/service/createConstrutora";
import ContrutoraProvider from "@/provider/ConstrutoraProvider";
import { useRouter } from "next/navigation";


export default function CadastrarFinanceira() {
  const router = useRouter();

 const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setTimeout(() => {}, 2000);
    router.push("/construtoras");

 }


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
              <BotaoRetorno rota="/construtoras" />
            </Box>
            <Heading>Criar Construtora</Heading>
            <Box> </Box>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          <CardCreateUpdate.Form action={CreateConstrutora}
          method="POST">
            <Flex w={"full"} flexWrap={"wrap"} gap={5}>
            <ContrutoraProvider>
              <CardCreateUpdate.GridConstrutoraCnpj w={"15rem"} />
              <CardCreateUpdate.GridConstrutoraRazaoSocial w={"35rem"} />
              <CardCreateUpdate.GridConstrutoraTel  w={"10rem"} />
              <CardCreateUpdate.GridConstrutoraEmail w={"30rem"} />
              <CardCreateUpdate.GridConstrutoraFantasia w={"25rem"} />
            </ContrutoraProvider>
              <Spacer />
              <Button
                type="submit"
                mt={2}
                alignSelf={"center"}
                colorScheme="green"
                size="lg"
                onClick={handleOnClick}
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
