import CreateAlertGeral from "@/app/componentes/bt_creat_Alert_geral";
import ConfirPg from "@/app/componentes/relatorio_finaceiro/confir_pg";
import GerarCobranca from "@/app/componentes/relatorio_finaceiro/gerar_cobranca";
import ListCobranca from "@/app/componentes/relatorio_finaceiro/list_cobranca";
import { auth } from "@/lib/auth_confg";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Link,
  Text
} from "@chakra-ui/react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "PAINEL ADMINISTRATIVO"
};

export default function PainelAdministrativo() {
  return (
    <>
  
      <Flex
        w={"100%"}
        minH={"90.9dvh"}
        px={{ base: 2, md: "10rem" }}
        py={5}
        flexDir={"column"}
      >
        <Flex w={"100%"} justifyContent={"space-around"}>
          <Heading>Painel Administrativo</Heading>
          <Flex gap={2} alignItems="center">
            <CreateAlertGeral />
            <Link
              py={1}
              px={5}
              border="none"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500", textDecoration: "none" }}
              boxShadow={"lg"}
              cursor={"pointer"}
              href={"/usuarios"}
              fontSize={"0.8rem"}
            >
              Usuario
            </Link>
            <Link
              py={1}
              px={5}
              border="none"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500", textDecoration: "none" }}
              boxShadow={"lg"}
              cursor={"pointer"}
              href={"/construtoras"}
              fontSize={"0.8rem"}
            >
              construtora
            </Link>
            <Link
              py={1}
              px={5}
              border="none"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500", textDecoration: "none" }}
              boxShadow={"lg"}
              cursor={"pointer"}
              href={"/empreendimentos"}
              fontSize={"0.8rem"}
            >
              Empreendimentos
            </Link>
            <Link
              py={1}
              px={5}
              border="none"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500", textDecoration: "none" }}
              boxShadow={"lg"}
              cursor={"pointer"}
              href={"/financeiras"}
              fontSize={"0.8rem"}
            >
              financeiras
            </Link>
          </Flex>
        </Flex>
        <Divider my={5} />
        <Flex
          w={"100%"}
          flexWrap={"wrap"}
          gap={2}
        >
          {/* componente relatório financeiro  */}
          <GerarCobranca />
          <Flex w={{base:"100%", md:"34%"}} gap={3} flexDir={"column"}>
          <ListCobranca />
          <ConfirPg />
          </Flex>
          
        </Flex>
      </Flex>
    </>
  );
  //     <Box
  //       border="3px solid #E8E8E8"
  //       borderRadius="8px"
  //       p={8}
  //       w={useBreakpointValue({ base: "100%", md: "80%", lg: "60em" })}
  //       textAlign="center"
  //       display={{ base: "block", md: "flex" }} // Mudança de 'none' para 'block' para garantir que o componente seja exibido em telas menores
  //       flexDir="column"
  //       alignItems="center"
  //       mt={8}
  //     >
  //       <Aprovacao />
  //     </Box>
}
