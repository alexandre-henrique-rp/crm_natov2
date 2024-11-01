import { GetFinanceiraById } from "@/actions/financeira/service/getFinanceiraById";
import { BotaoRetorno } from "@/app/components/botoes/btm_retorno";
import { CardUpdateFinanceira } from "@/app/components/card_EditarFinanceira";
import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const req = await GetFinanceiraById(Number(id));
  const data = req.data;

  return {
    title: `Editar Financeira: ${data.fantasia || "Usuário"}`
  };
}

export default async function EditarUsuario({ params }: Props) {
  const id = Number(params.id);

  const req = await GetFinanceiraById(id);
  const data = req.data;

  return (
    <>
      <Flex
        w={"100%"}
        minH={"90.9dvh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          w={"70%"}
          bg={"gray.50"}
          borderRadius={"1rem"}
          boxShadow={"lg"}
          p={8}
        >
          <Flex justifyContent={"space-between"}>
            <Box>
              <BotaoRetorno rota="/usuarios" />
            </Box>
            <Heading>Editar Financeira</Heading>
            <Box> </Box>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          <CardUpdateFinanceira id={id} setFinanceiraCard={data} />
        </Box>
      </Flex>
    </>
  );
}
