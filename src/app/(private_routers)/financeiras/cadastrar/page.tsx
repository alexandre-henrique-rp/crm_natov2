import UserCreate from "@/actions/user/create";
import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import { CardCreateUpdate } from "@/app/implementes/cardCreateUpdate";
import UserRegisterProvider from "@/provider/UserRegister";
import { Box, Button, Divider, Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";
import BotaoCancelar from "@/app/componentes/btn_cancelar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CADASTRO DE FINANCEIRA",
};

export default function CadastrarFinanceira() {

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
              <BotaoRetorno rota="/usuarios" />
            </Box>
            <Heading>Criar Financeira</Heading>
            <Box> </Box>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          <CardCreateUpdate.Form action={UserCreate}>
            <Flex w={"full"} flexWrap={"wrap"} gap={5}>
              {/* <UserRegisterProvider>
                <CardCreateUpdate.GridCpf w={"15rem"} />
                <CardCreateUpdate.GridName w={"35rem"} />
                <CardCreateUpdate.GridUser w={"15rem"} />
                <CardCreateUpdate.GridRegisterTel w={"10rem"} />
                <CardCreateUpdate.GridEmail w={"25rem"} />
                <CardCreateUpdate.GridUserConstrutora w={"23rem"} />
                <CardCreateUpdate.GridUserEmpreendimento w={"25rem"} />
                <CardCreateUpdate.GridUserFinanceiro w={"23rem"} />
                <CardCreateUpdate.GridUserCargo w={"20rem"} />
                <CardCreateUpdate.GridUserHierarquia w={"20rem"} />
                <CardCreateUpdate.GridUserSenha w={"20rem"} />
                <CardCreateUpdate.GridUserConfirSenha w={"20rem"} />
              </UserRegisterProvider> */}
              <Spacer /> 
              <Button type="submit" mt={2} alignSelf={'center'} colorScheme='green' size='lg'>
                Salvar
              </Button>
              <BotaoCancelar mt={2} alignSelf={'center'} colorScheme='red' variant='outline' size='lg' />

            </Flex>
            <Divider my={4} borderColor="gray.300" />
            <Flex w={"full"} justifyContent={"end"}></Flex>
          </CardCreateUpdate.Form>
        </Box>
      </Flex>
    </>
  );
}
