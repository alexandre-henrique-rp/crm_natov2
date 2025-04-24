"use client"; // Marca o componente para uso no cliente
import UserRegisterProvider from "@/provider/UserRegister";
import { Box, Button, Divider, Flex, Heading, Spacer } from "@chakra-ui/react";
import UserCreate from "@/actions/user/create";
import { CardCreateUpdate } from "@/implementes/cardCreateUpdate";
import BotaoCancelar from "@/components/botoes/btn_cancelar";

// Componente de cadastro de usuário com layout responsivo e clean code
export default function CadastrarUsuario() {
  return (
    <Flex
      minH="90.9dvh"
      // align="center"
      // justify="center"
      bg="gray.100"
      py={{ base: 4, md: 8 }}
      px={{ base: 2, md: 2 }}
    >
      {/* Card visual centralizado e responsivo */}
      <Box
        w={"100%"}
        bg="gray.50"
        borderRadius="1rem"
        boxShadow="lg"
        h={"100%"}
        p={{ base: 4, md: 8 }}
      >
        {/* Cabeçalho do formulário */}
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "start", md: "center" }} mb={4} gap={2}>
          <Heading fontSize={{ base: "xl", md: "2xl" }}>Criar Usuário</Heading>
          {/* Espaço reservado para ações futuras, se necessário */}
          <Box></Box>
        </Flex>
        <Divider my={2} borderColor="gray.400" />
        {/* Formulário de cadastro */}
        <CardCreateUpdate.Form action={UserCreate}>
          <Flex
            w="full"
            flexWrap="wrap"
            gap={4}
            direction={{ base: "column", md: "row" }}
            align={{ base: "stretch", md: "start" }}
          >
            <UserRegisterProvider>
              {/* Campos do formulário com largura responsiva */}
              <CardCreateUpdate.GridCpf w={{ base: "100%", md: "15rem" }} />
              <CardCreateUpdate.GridName w={{ base: "100%", md: "35rem" }} />
              <CardCreateUpdate.GridUser w={{ base: "100%", md: "15rem" }} />
              <CardCreateUpdate.GridRegisterTel w={{ base: "100%", md: "10rem" }} />
              <CardCreateUpdate.GridEmail w={{ base: "100%", md: "25rem" }} />
              <CardCreateUpdate.GridUserConstrutora w={{ base: "100%", md: "23rem" }} />
              <CardCreateUpdate.GridUserEmpreendimento w={{ base: "100%", md: "25rem" }} />
              <CardCreateUpdate.GridUserFinanceiro w={{ base: "100%", md: "23rem" }} />
              <CardCreateUpdate.GridUserCargo w={{ base: "100%", md: "20rem" }} />
              <CardCreateUpdate.GridUserHierarquia w={{ base: "100%", md: "20rem" }} />
              <CardCreateUpdate.GridUserSenha w={{ base: "100%", md: "20rem" }} />
              <CardCreateUpdate.GridUserConfirSenha w={{ base: "100%", md: "20rem" }} />
            </UserRegisterProvider>
            {/* Espaçamento flexível para alinhar botões */}
            <Spacer display={{ base: "none", md: "block" }} />
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          {/* Botões de ação alinhados à direita */}
          <Flex w="full" justify="flex-end" gap={2} mt={2}>
            <Button
              type="submit"
              colorScheme="green"
              size="lg"
              className="btn"
            >
              Salvar
            </Button>
            <BotaoCancelar
              colorScheme="red"
              variant="outline"
              size="lg"
              className="btn"
            />
          </Flex>
        </CardCreateUpdate.Form>
      </Box>
    </Flex>
  );
}
