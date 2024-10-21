import CreateAlertGeral from "@/components/botoes/btn_creat_Alert_geral";
import ConfirPg from "@/components/relatorio_finaceiro/confir_pg";
import GerarCobranca from "@/components/relatorio_finaceiro/gerar_cobranca";
import ListCobranca from "@/components/relatorio_finaceiro/list_cobranca";
import { Divider, Flex, Heading, Link } from "@chakra-ui/react";
import { Metadata } from "next";

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
              Construtora
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
              Financeiras
            </Link>
          </Flex>
        </Flex>
        <Divider my={5} />
        <Flex w={"100%"} flexWrap={"wrap"} gap={2}>
          {/* componente relatório financeiro  */}
          <GerarCobranca />
          <Flex w={{ base: "100%", md: "34%" }} gap={3} flexDir={"column"}>
            <ListCobranca />
            <ConfirPg />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
