import UserCreate from "@/actions/user/create";
import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import BotaoCancelar from "@/app/componentes/btn_cancelar";
import { CardCreateUpdate } from "@/app/implementes/cardCreateUpdate";
import { Box, Button, Divider, Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";

export default function Create() {
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
              <BotaoRetorno rota="/construtora" />
            </Box>
            <Heading>Criar Construtora</Heading>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          {/* <CardCreateUpdate.Form action={{}}> */}
            <Flex w={"full"} flexWrap={"wrap"} gap={5}>
              {/* <CardCreateUpdate.GridRazaoConstrutora w={"15rem"} /> */}

            </Flex>
            <Divider my={4} borderColor="gray.300" />
            <Flex w={"full"} justifyContent={"end"}></Flex>
          {/* </CardCreateUpdate.Form> */}
        </Box>
      </Flex>
    </>
  );
}
