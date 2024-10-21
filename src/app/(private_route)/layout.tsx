import BotaoJuncao from "@/components/botoes/bt_juncao";
import FooterComponent from "@/components/footer";
import { Box, Flex } from "@chakra-ui/react";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <Flex minW={"100vw"} minH={"100vh"} justifyContent={'space-between'} flexDir={"column"} >
      <BotaoJuncao />
      <Box h={"90vh"} overflowY={'auto'}>
      {children}
      </Box>
      <FooterComponent />
    </Flex>
  );
}
