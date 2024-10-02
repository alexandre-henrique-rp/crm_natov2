import UserCreate from "@/actions/user/create";
import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import { CardCreateUpdate } from "@/app/implementes/cardCreateUpdate";
import UserRegisterProvider from "@/provider/UserRegister";
import { Box, Button, Divider, Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";
import BotaoCancelar from "@/app/componentes/btn_cancelar";
import { Metadata } from "next";
import { CardUpdateUsuario } from "@/app/componentes/card_update_usuario";
import { GetUser } from "@/actions/user/service";

type Props = {
  params: { id: string };
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const id = params.id;
  const data = await GetUser(Number(id))

  return {
    title: `Editar Usuário: ${data?.nome || 'Usuário'}`,
  }
}

export default async function EditarUsuario({params}: Props) {

  const id = params.id;
  const data = await GetUser(Number(id))

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
            <Heading>Editar Usuário</Heading>
            <Box> </Box>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          <CardUpdateUsuario setUsuarioCard={data} />
        </Box>
      </Flex>
    </>
  );
}
