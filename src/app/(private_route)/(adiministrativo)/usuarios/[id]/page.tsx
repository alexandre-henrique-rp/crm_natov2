"use client";
import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BotaoRetorno } from "@/components/botoes/btm_retorno";
import { CardUpdateUsuario } from "@/components/card_update_usuario";

type Props = {
  params: { id: string };
};

export default function EditarUsuario({ params }: Props) {
  const [data, setData] = useState<any>({});
  const id = Number(params.id);

  const fetchUser = async (id: number) => {
    const req = await fetch(`/api/usuario/getId/${id}`);
    const res = await req.json();
    setData(res);
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);
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
          <CardUpdateUsuario id={id} setUsuarioCard={data} />
        </Box>
      </Flex>
    </>
  );
}
