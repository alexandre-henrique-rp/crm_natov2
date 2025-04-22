import { Box, Button, Divider, Flex, Heading, Spacer } from "@chakra-ui/react";
import FinanceiraProvider from "@/provider/FinanceiraProvider";
import FinanceiraCreate from "@/actions/financeira/service/createFinanceira";
import { BotaoRetorno } from "@/components/botoes/btm_retorno";
import { CardCreateUpdate } from "@/implementes/cardCreateUpdate";
import BotaoCancelar from "@/components/botoes/btn_cancelar";

export default async function CadastrarFinanceira() {
  return (
    <>
      <Flex
        w={"100%"}
        h={"100%"}
        px={{ base: 0, md: 8 }}
      >
        <Box
          bg={"gray.50"}
          borderRadius={"1rem"}
          boxShadow={"2xl"}
          p={{ base: 4, md: 8 }}
        >
          <Flex>
  
            <Heading fontSize={"1.5rem"}>Criar Financeira</Heading>
            <Box> </Box>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          <CardCreateUpdate.Form action={FinanceiraCreate} method="POST">
            <Flex w={"full"} flexWrap={"wrap"} gap={5} py={{ base: 4, md: 16 }}>
              <FinanceiraProvider>
                <CardCreateUpdate.GridCnpj w={"15rem"} />
                <CardCreateUpdate.GridRazaoSocial w={"35rem"} />
                <CardCreateUpdate.GridRazaoSocialTel w={"10rem"} />
                <CardCreateUpdate.GridRazaoSocialEmail w={"30rem"} />
                <CardCreateUpdate.GridResponsavel w={"25rem"} />
                <CardCreateUpdate.GridFantasia w={"15rem"} />
                <CardCreateUpdate.GridFinanceiraConstrutora w={"25rem"} />
              </FinanceiraProvider>
              <Spacer />
            </Flex>
            <Divider my={4} borderColor="gray.300" />
            <Flex w={"full"} justifyContent={"end"} gap={2}>

              <Button
                type="submit"
                mt={2}
                alignSelf={"center"}
                colorScheme="green"
                size="lg"
              >
                Salvar
              </Button>
              <BotaoCancelar
                mt={2}
                alignSelf={"center"}
                colorScheme="red"
                variant="outline"
                size="lg"
              />
            </Flex>
          </CardCreateUpdate.Form>
        </Box>
      </Flex>
    </>
  );
}
