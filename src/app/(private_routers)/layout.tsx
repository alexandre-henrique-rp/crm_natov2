import { Box } from "@chakra-ui/react";
import BotaoJuncao from "./home/componentes/botoes/bt_juncao";
import FooterComponent from "../componentes/footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <Box maxH={"100dvh"} maxW={"100vw"}>
      <BotaoJuncao />
      {children}
      <FooterComponent />
    </Box>
  );
}
