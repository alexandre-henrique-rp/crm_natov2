import { getAllChamados } from "@/actions/chamados/service/getAll";
import { getById } from "@/actions/chamados/service/getById";
import { TabelaChamados } from "@/components/tabelaChamados";
import { auth } from "@/lib/auth_confg";
import { Flex } from "@chakra-ui/react";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";

export const metadata: Metadata = {
  title: "CHAMADOS",
  description: "sistema de suporte"
};

export default async function ChamadosPage() {
  const session = await getServerSession(auth);
  const userHierarquia = session?.user.hierarquia;

  const idUser = session?.user.id;
  async function isAdm(id: any) {
    if (userHierarquia === "ADM") {
      const res = await getAllChamados();
      return res;
    } else {
      const res = await getById(id);
      return res;
    }
  }
  const res = await isAdm(idUser);
  const chamados = res.data;

  return (
    <Flex
      minH="100vh"
      w="100%"
      justifyContent="center"
      alignItems="center"
      bg="#F8F8F8"
      py="2rem"
    >
      <TabelaChamados chamados={chamados} registrosPorPagina={10} />
    </Flex>
  );
}
