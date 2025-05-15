// "use client";
"use server";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CardCreateUpdate } from "@/implementes/cardCreateUpdate";
import UserRegisterProvider from "@/provider/UserRegister";
import BotaoCancelar from "@/components/botoes/btn_cancelar";
import { UpdateUser } from "@/actions/user/service";
import Loading from "@/app/loading";
import { GetSessionServer } from "@/lib/auth_confg";
import Permissoes from "@/components/usuarios_component/permissoes";

type Props = {
  params: { id: string };
};

const lista = [
  { name: "adm", label: "Acesso ao painel administrativo" },
  { name: "direto", label: "Acesso ao Nato Direto" },
  { name: "relatorio", label: "Acesso ao relatório" },
  { name: "cad_financeiro", label: "Pode criar CCA" },
  { name: "user", label: "Pode criar Usuário" },
  { name: "cad_construtora", label: "Pode criar Construtora" },
  { name: "cad_empreendimento", label: "Pode criar Empreendimento" },
  { name: "now", label: "Pode criar Now" },
  { name: "alerta", label: "Pode criar e responder Alerta" },
  { name: "chamado", label: "Pode ver e responder Chamado" },
  { name: "solicitacao", label: "Pode editar Solicitação" },
];

const fetchUser = async (id: number, token: string) => {
  try {
    const reqest = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user/get/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await reqest.json();
    if (!reqest.ok) {
      console.error("Erro ao buscar dados do usuário:", reqest.statusText);
      return null;
    }
    return res;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    return null;
  }
};

export default async function EditarUsuario({ params }: Props) {
  const session = await GetSessionServer();

  const id = Number(params.id);
  const data = await fetchUser(id, session?.token ?? "");

  return (
    <>
      {!data && <Loading />}
      {data && (
        <Flex
          minH="90.9dvh"
          bg="gray.100"
          py={{ base: 4, md: 8 }}
          px={{ base: 2, md: 2 }}
        >
          <Box
            w={"100%"}
            bg="gray.50"
            borderRadius="1rem"
            boxShadow="lg"
            h={"100%"}
            p={{ base: 4, md: 8 }}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "start", md: "center" }}
              mb={4}
              gap={2}
            >
              <Heading fontSize={{ base: "xl", md: "2xl" }}>
                Editar Usuário
              </Heading>
              <Box></Box>
            </Flex>
            <Divider my={2} borderColor="gray.400" />
            <CardCreateUpdate.Form action={UpdateUser}>
              <Flex
                w="full"
                flexWrap="wrap"
                gap={4}
                direction={{ base: "column", md: "row" }}
                align={{ base: "stretch", md: "start" }}
              >
                <UserRegisterProvider>
                  <CardCreateUpdate.GridCpf
                    w={{ base: "100%", md: "15rem" }}
                    idUser={id}
                    CPF={data?.cpf ?? ""}
                  />
                  <CardCreateUpdate.GridName
                    w={{ base: "100%", md: "35rem" }}
                    Nome={data?.nome ?? ""}
                  />
                  <CardCreateUpdate.GridUser
                    w={{ base: "100%", md: "15rem" }}
                    Usuario={data?.username ?? ""}
                  />
                  <CardCreateUpdate.GridRegisterTel
                    w={{ base: "100%", md: "10rem" }}
                    tell={data?.telefone ?? ""}
                  />
                  <CardCreateUpdate.GridEmail
                    w={{ base: "100%", md: "25rem" }}
                    email={data?.email ?? ""}
                  />
                  <CardCreateUpdate.GridUserConstrutora
                    w={{ base: "100%", md: "23rem" }}
                    UserConstrutora={data?.construtoras ?? ""}
                  />
                  <CardCreateUpdate.GridUserEmpreendimento
                    w={{ base: "100%", md: "25rem" }}
                    UserEmpreedimento={data?.empreendimentos ?? ""}
                  />
                  <CardCreateUpdate.GridUserFinanceiro
                    w={{ base: "100%", md: "23rem" }}
                    UserFinanceira={data?.financeiros ?? ""}
                  />
                  <CardCreateUpdate.GridUserCargo
                    w={{ base: "100%", md: "20rem" }}
                    UserCargo={data?.cargo ?? ""}
                  />
                  <CardCreateUpdate.GridUserHierarquia
                    w={{ base: "100%", md: "20rem" }}
                    UserHierarquia={data?.hierarquia ?? ""}
                  />
                  <Permissoes data={data?.role ?? null} />
                </UserRegisterProvider>
                <Spacer display={{ base: "none", md: "block" }} />
              </Flex>
              <Divider my={4} borderColor="gray.300" />
              <Flex w="full" justify="flex-end" gap={2} mt={2}>
                <Button
                  type="submit"
                  colorScheme="green"
                  size="lg"
                  className="btn"
                >
                  Salvar
                </Button>
                <BotaoCancelar
                  colorScheme="red"
                  variant="outline"
                  size="lg"
                  className="btn"
                />
              </Flex>
            </CardCreateUpdate.Form>
          </Box>
        </Flex>
      )}
    </>
  );
}
