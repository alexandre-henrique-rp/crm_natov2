
import { BotaoRetorno } from "@/components/botoes/btm_retorno";
import Construtora from "@/components/construtora_compoment";
import { auth } from "@/lib/auth_confg";
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

/**
 * Get construtora
 * @type {ConstrutoraType}
 * @param { number } id
 * @param { string } cnpj
 * @param { string } razaosocial
 * @param { string | null } tel
 * @param { string | null } email
 * @param { Date | string | any } createdAt
 * @param { string | null } fantasia
 *
 * @returns { id: number, cnpj: string, razaosocial: string, tel: string | null, email: string | null, createdAt: Date | string | any, fantasia: string | null }
 *
 */
export type ConstrutoraType = {
  id: number;
  cnpj: string;
  razaosocial: string;
  tel: string | null;
  email: string | null;
  createdAt: Date | string | any;
  fantasia: string | null;
  status: boolean;
};

async function GetConstrutora() {
  const session = await getServerSession(auth);
  const hierarquia = session?.user?.hierarquia;
  try {
    const request = await prisma.nato_empresas.findMany({
      where: {
        atividade: "CONST",
        ...(hierarquia !== "ADM" && {
          status: true
        })
      },
      select: {
        id: true,
        cnpj: true,
        email: true,
        razaosocial: true,
        createdAt: true,
        tel: true,
        fantasia: true,
        status: true
      }
    });
    return { status: 200, message: "success", data: request };
  } catch (error: any) {
    return { status: 500, message: "error", data: error };
  }
}

export const metadata: Metadata = {
  title: "Construtoras",
};
export default async function ConstrutoraPage() {
  const Dados = await GetConstrutora();
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
        <Flex gap={2}>
        <Box zIndex={1} alignSelf="baseline" position="initial">
            <BotaoRetorno rota="/" />
          </Box>
          <Heading>Construtora</Heading>
          </Flex>
          <Link
            href={"/construtoras/cadastrar"}
            _hover={{ textDecoration: "none" }}
          >
            <Box
              py={2}
              px={7}
              border="3px solid green.600"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500" }}
              boxShadow={"lg"}
              cursor={"pointer"}
            >
              Criar Construtora
            </Box>
          </Link>
        </Flex>
        <Divider my={5} />
        <Box ml={4}>
          <Text fontSize="25px" fontWeight="bold" color="#333333">
            CONSTRUTORA CADASTRADAS
          </Text>
        </Box>
        <Box w={"100%"}>
          <Box>
            {Dados?.status === 200 ? <Construtora data={Dados?.data} /> : <></>}
          </Box>
        </Box>
      </Flex> 
    </>
  );
}
