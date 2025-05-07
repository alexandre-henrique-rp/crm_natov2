"use client";
import Loading from "@/app/loading";
import Alertas from "@/components/adm/alertas";
import CardAdmUsuario from "@/components/adm/card";

import RelatorioFinanceiro from "@/components/adm/financeiro/RelatorioFinanceiro";
import ModalAddAlerta from "@/components/adm/modal/add_alerta";
import ModalAddCobranca from "@/components/adm/modal/add_cobranca";
import { useSession } from "@/hook/useSession";
import { Box, Flex, Heading, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuBuilding, LuDollarSign, LuFileText, LuUsers } from "react-icons/lu";

interface RelatorioType {
  usuarios: number;
  construtoras: number;
  relatorios: number;
  cobrancas_aberto: string;
}

export default async function PainelAdministrativo() {
  const [dados, setDados] = useState<RelatorioType | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const session = useSession();

  useEffect(() => {
    if (!dados) {
      setLoading(true);
    }
    fetchDados();
  }, []);

  const fetchDados = async () => {
    try {
      const req = await fetch("/api/relatorio/getall");
      const res = await req.json();
      console.log("🚀 ~ fetchDados ~ res:", res);
      setDados(res);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {dados && (
        <Box w={"100%"} px={4} overflow={"auto"}>
          <Box w={"100%"} borderRadius={"2rem"} boxShadow={"dark-lg"} p={8}>
            <Box w={"100%"}>
              <Heading>Painel Administrativo</Heading>
            </Box>
            {session?.hierarquia === "ADM" && (
              <>
                <Flex w={"100%"} py={8} justifyContent={"flex-end"} gap={2}>
                  <ModalAddCobranca />
                  <ModalAddAlerta />
                </Flex>
                <Flex flexDirection={"column"} gap={10} pt={3}>
                  <Flex w={"100%"} justifyContent={"space-between"} gap={2}>
                    <CardAdmUsuario
                      count={dados.usuarios}
                      title={"Usuários"}
                      icon={<LuUsers size={24} />}
                    />
                    <CardAdmUsuario
                      count={dados.construtoras}
                      title={"Construtoras"}
                      icon={<LuBuilding size={24} />}
                    />
                    <CardAdmUsuario
                      count={dados.cobrancas_aberto}
                      title={"Cobranças em Aberto"}
                      icon={<LuDollarSign size={24} />}
                    />
                    <CardAdmUsuario
                      count={dados.relatorios}
                      title={"Relatórios Gerados"}
                      icon={<LuFileText size={24} />}
                    />
                  </Flex>
                  <Flex w={"100%"} justifyContent={"space-between"} gap={2}>
                    <Box w={"70%"}>
                      <RelatorioFinanceiro onAtualizar={fetchDados} />
                    </Box>
                    <Box w={"30%"}>
                      <Alertas />
                    </Box>
                  </Flex>
                </Flex>
              </>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
