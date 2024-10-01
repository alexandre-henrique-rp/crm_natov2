import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import { Box, Divider, Flex, Heading } from "@chakra-ui/react";

export default function Create() {
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
              <BotaoRetorno rota="/construtora" />
            </Box>
            <Heading>Criar Construtora</Heading>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          {/* compoment */}
        </Box>
      </Flex>
    </>
  );
}
