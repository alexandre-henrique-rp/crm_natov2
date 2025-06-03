import { CardCreateUpdate } from "@/implementes/cardCreateUpdate";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  VStack,
  Text,
  Tag as ChakraTag, // Renomeando para evitar conflito com o nome da função
} from "@chakra-ui/react";
import { GetSessionServer } from "@/lib/auth_confg";

const metadata: Metadata = {
  title: "",
}

export default async function Tags() {
  const session = await GetSessionServer();
  const handleCreateTag = async (_: any, formData: FormData) => {
    'use server';
    // Lógica para criar a tag (ex: enviar para API)
    console.log("Nova tag:", formData.get("tag"));
    // Idealmente, aqui você invalidaria o cache ou faria um re-fetch das tags
  };

  // Exemplo de dados para a lista de tags (substitua com seus dados reais)
  const exampleTags = [
    { id: "1", name: "Importante" },
    { id: "2", name: "Urgente" },
    { id: "3", name: "Desenvolvimento" },
    { id: "4", name: "Marketing" },
  ];

  return (
    <>
      <Box w="100%" h="calc(100vh - 80px)" px={4} /* Ajuste h para considerar a navbar */>
        <Box
          w="100%"
          h="full"
          borderRadius="1.5rem" // Reduzindo um pouco o borderRadius
          boxShadow="xl" // Usando um boxShadow mais suave
          p={{ base: 4, md: 6, lg: 8 }} // Padding responsivo
          bg="white" // Adicionando um fundo branco para o card principal
        >
          <Heading as="h1" size="lg" mb={6} textAlign={{ base: "center", md: "left" }}>
            Gerenciamento de Tags
          </Heading>
          <Divider mb={6} borderColor="gray.300" />

          <Flex
            w="100%"
            h="calc(100% - 100px)" // Ajustar altura para caber o título e divider
            direction={{ base: "column", md: "row" }} // Coluna em mobile, linha em desktop
            gap={6} // Espaçamento entre as seções
          >
            {/* Seção Lista de Tags */}
            <Box
              w={{ base: "100%", md: "50%" }}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              borderColor="gray.200"
              h={{ base: "auto", md: "full" }}
            >
              <Heading fontSize="lg" mb={4} textAlign="center">
                Lista de Tags
              </Heading>
              <Box h={{ base: "200px", md: "calc(100% - 60px)"}} overflowY="auto" pr={2} /* Adiciona padding à direita para a scrollbar */>
                {exampleTags.length > 0 ? (
                  <VStack spacing={3} align="stretch">
                    {exampleTags.map((tag) => (
                      <ChakraTag
                        key={tag.id}
                        size="lg"
                        variant="subtle"
                        colorScheme="blue" // Escolha um colorScheme que combine
                        p={2}
                        borderRadius="md"
                        w="100%"
                        justifyContent="space-between"
                      >
                        <Text>{tag.name}</Text>
                        {/* Adicionar botões de ação (editar, excluir) aqui se necessário */}
                        {/* <IconButton aria-label="Excluir tag" icon={<DeleteIcon />} size="sm" /> */}
                      </ChakraTag>
                    ))}
                  </VStack>
                ) : (
                  <Text textAlign="center" color="gray.500">
                    Nenhuma tag cadastrada ainda.
                  </Text>
                )}
              </Box>
            </Box>

            {/* Seção Cadastrar Tag */}
            <Box
              w={{ base: "100%", md: "50%" }}
              p={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="flex-start" // Alinha ao topo
              borderWidth="1px"
              borderRadius="md"
              borderColor="gray.200"
            >
              <Heading fontSize="lg" mb={4} textAlign="center">
                Cadastrar Nova Tag
              </Heading>
              <Box w={{ base: "100%", sm: "80%", md: "70%", lg: "60%" }} mt={4}>
                <CardCreateUpdate.Form action={handleCreateTag}>
                  <VStack spacing={4}>
                    <Input
                      type="text"
                      name="tag"
                      placeholder="Nome da Tag"
                      size="lg"
                      focusBorderColor="blue.500"
                    />
                    <Button
                      w="full"
                      colorScheme="green"
                      type="submit"
                      size="lg"
                      _hover={{ bg: "green.600" }}
                    >
                      Cadastrar Tag
                    </Button>
                  </VStack>
                </CardCreateUpdate.Form>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
