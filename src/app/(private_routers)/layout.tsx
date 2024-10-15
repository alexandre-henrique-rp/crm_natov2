'use client';
import { signOut, useSession } from "next-auth/react";
import Loading from "../loading";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import BotaoJuncao from "./home/componentes/botoes/bt_juncao";
import FooterComponent from "../componentes/footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <Box overflowY={"auto"} h={"100dvh"} w={"100vw"}>
      <BotaoJuncao />
      {children}
      <FooterComponent />
    </Box>
  );
}
