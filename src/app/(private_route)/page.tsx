import { BugReport } from "@/components/bug";
import { FilterRoute } from "@/components/filter/filtro_route";
import { DadoCompomentList } from "@/components/home/lista";
import { UserCompomentInfo } from "@/components/home/user";
import PerfilHome from "@/components/perfil_home";
import ModalPrimeAsses from "@/components/prime_asses";
import ModalTermos from "@/components/termos";
import { GetSessionServer } from "@/lib/auth_confg";
import { SessionServer } from "@/types/session";
import { Box, Flex } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOME",
  description: "sistema de gestão de vendas de imóveis",
};

const GetListaDados = async (
  session: SessionServer | null
): Promise<solictacao.SolicitacaoGetType[] | null> => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao`;
  const user = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    cache: "no-store",
  });
  const data = await user.json();
  if (!user.ok) {
    console.error("GetListaDados status:", data.message);
    return null;
  }
  return data;
};

export default async function HomePage() {
  const session = await GetSessionServer();
  const ListDados = await GetListaDados(session);

  return (
    <>
      <Flex
        minH="89.8vh"
        w="100%"
        bg="#F8F8F8"
        overflowY="auto"
        overflowX="hidden"
      >
        {/* <ModalPrimeAsses session={session} />
        <ModalTermos session={session} /> */}

        {/* dados user */}
        <UserCompomentInfo session={session} />
        <DadoCompomentList dados={ListDados} session={session} />
      </Flex>
    </>
  );
}





// <Flex
//   minH="100vh"
//   w="100%"
//   justifyContent="center"
//   bg="#F8F8F8"
//   py="2rem"
// >
//   <ModalPrimeAsses session={session} />
//   <ModalTermos session={session} />
//   <Box
//     w={{ base: "98%", xl: "80%" }}
//     justifyContent="space-between"
//   >
//     <BugReport />
//     <Box justifyContent="center" alignItems="center">
//       <PerfilHome session={session} />
//     </Box>
//     <Box>
//       <FilterRoute session={session} />
//     </Box>
//   </Box>
// </Flex>
