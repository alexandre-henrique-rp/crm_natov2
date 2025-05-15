"use client";

import { Flex, Box, Text } from "@chakra-ui/react";
import TextHome from "./text";

import { useState, useEffect } from "react"; // Importando useEffect para atualizar estados de forma segura
import { SelectComponent } from "../select";
import { ModalComponent } from "../modal_alert";
import BotaoPageChamados from "../botoes/btn_page_chamados";
import { SessionServer } from "@/types/session";

interface Props {
  session: SessionServer | null;
}

export default function PerfilHome({ session }: Props) {
  const [IdEmpreedimento, setIdEmpreedimento] = useState(0);
  const [IdConstrutora, setIdConstrutora] = useState(0);
  const user = session?.user;
  console.log("🚀 ~ PerfilHome ~ user:", user)

  //   setIdEmpreedimento(id);
  // };
  const SetIdConstrutora = (id: number) => {
    setIdConstrutora(id);
  };
  // Corrigido: atualização de estados com useEffect para evitar loop infinito
  useEffect(() => {
    if (user?.construtora?.length === 1 && !IdConstrutora) {
      setIdConstrutora(user.construtora[0].id);
    }
  }, [user, IdConstrutora]);

  useEffect(() => {
    if (user?.empreendimento.length === 1 && !IdEmpreedimento) {
      setIdEmpreedimento(user.empreendimento[0].id);
    }
  }, [user, IdEmpreedimento]);

  return (
    <>
      {!user && null}
      {user && (
        <Flex
          w="100%"
          bg="white"
          shadow="md"
          borderRadius="15px"
          p="20px"
          flexDirection={{ base: "column", md: "row" }} // Ajusta a direção da flexbox para diferentes tamanhos de tela
          gap={{ base: "20px", md: "10px" }} // Espaçamento entre os elementos
        >
          <Box>
            <ModalComponent />
          </Box>
          <Box w={{ base: "100%", md: "40%" }}>
            <TextHome SetName="NOME" SetValue={user.nome} />
            <TextHome SetName="TELEFONE" SetValue={user.telefone} />
          </Box>
          <Box w={{ base: "100%", md: "40%" }}>
            <TextHome SetName="CARGO" SetValue={user.cargo} />

            {user.construtora?.length > 1 ? (
              <>
                <Text textColor="#00713D" fontWeight="bold">
                  CONSTRUTORA
                </Text>
                <SelectComponent
                  SetValue={user.construtora.map((item) => ({
                    id: item.id,
                    nome: item.fantasia,
                  }))}
                  onValue={SetIdConstrutora}
                  hierarquia={user?.hierarquia}
                  tag={""}
                  DefaultValue={IdConstrutora}
                />
              </>
            ) : (
              user.construtora?.length === 1 && (
                <TextHome
                  SetName="CONSTRUTORA"
                  SetValue={user.construtora[0].fantasia}
                />
              )
            )}
          </Box>
          <BotaoPageChamados />
        </Flex>
      )}
    </>
  );
}
