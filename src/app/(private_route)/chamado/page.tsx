import {
  Badge,
  Box,
  Button,
  Code,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

export default function ChamadoPage() {
  return (
    <>
      <Flex
        minH="88.6vh"
        w="100%"
        bg="#F8F8F8"
        overflowY="auto"
        overflowX="hidden"
        justifyContent={"center"}
        px={{ base: 0, md: "8rem", lg: "15rem" }}
      >
        <Flex
          w={"100%"}
          minH={"100%"}
          px={{ base: 0, md: 4 }}
          py={4}
          flexDir={"column"}
          gap={4}
        >
          {/* 1 */}
          <Flex justifyContent={"space-between"} alignItems={"end"} mb={10}>
            <Box>
              <Heading>Chamados de Suporte</Heading>
              <Flex gap={2}>
                <Text>6 chamados</Text>
                <Badge colorScheme="red">2 críticos</Badge>
                <Badge colorScheme="green">3 abertos</Badge>
                <Badge colorScheme="yellow">1 aguardando</Badge>
              </Flex>
            </Box>
            <Flex>
              <Button colorScheme="green">Novo Chamado</Button>
            </Flex>
          </Flex>

          {/* 2 */}
          <Flex
            w={"100%"}
            gap={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box w={"25rem"}>
              <Input type="text" placeholder="Buscar chamados" w={"100%"} />
            </Box>
            <Box w={"15rem"}>
              <Select placeholder="status" w={"100%"} />
            </Box>
            <Box w={"15rem"}>
              <Select placeholder="prioridade" w={"100%"} />
            </Box>
            <Box w={"15rem"}>
              <Select placeholder="Departamento" w={"100%"} />
            </Box>
            <Box w={"10rem"}>
              <Button colorScheme="green" w={"100%"}>
                Filtrar
              </Button>
            </Box>
          </Flex>
          <Divider my={4} borderColor="gray.300" />

          {/* 3 */}
          <Flex>
            {/* card */}
            <Box
              p={4}
              borderRadius="15px"
              shadow="md"
              _hover={{ shadow: "xl" }}
              overflowY="auto"
              w={"100%"}
              bg="#fff"
              border="1px solid"
              borderColor="gray.300"
            >
              <Flex justifyContent={"space-between"} alignItems={"start"}>
                <Flex flexDir={"column"} gap={4}>
                  <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"md"} fontWeight={"bold"}>Problemas com acesso ao sistema financeiro</Text>
                    <Badge colorScheme="blue">ABERTO</Badge>
                    <Badge colorScheme="yellow">ALTA</Badge>
                  </Flex>
                  <Flex gap={2}>
                    <Text fontSize={"sm"}>Solicitante: João Silva</Text>•
                    <Text fontSize={"sm"}>Departamento: Financeiro</Text>
                  </Flex>
                  <Flex gap={4}>
                    <Code children='ID: TK-2023-001' />
                    <Code children='Aberto em: 21/05/2025' />
                    <Code children='Última atualização: 13/05/2023' />
                  </Flex>
                </Flex>
                <Flex gap={2}>
                  <Button colorScheme="green">Ver</Button>
                  <Button colorScheme="blue" variant="outline">
                    Editar
                  </Button>
                  <Button colorScheme="red">Excluir</Button>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
