import BtnChamado from "@/components/chamado/btn";
import { GetSessionServer } from "@/lib/auth_confg";
import {
  Badge,
  Box,
  Button,
  Code,
  Divider,
  Flex,
  Heading,
  Input,
  Link,
  Select,
  Text,
} from "@chakra-ui/react";

interface TypeChamado {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  departamento: string;
  prioridade: string;
  dth_qru: string;
  idUser: number;
  solicitacaoId: number;
  temp: any[];
  chat: any[];
  images: any[];
  createAt: string;
  updatedAt?: string;
}

async function getChamadosAll(session: SessionNext.Server | null) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/chamado`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("getChamadosAll status:", response.status);
    return [];
  }

  const data = await response.json();
  return data ?? [];
}


export default async function ChamadoPage() {
  const session = await GetSessionServer();
  const chamados = session ? await getChamadosAll(session) : [];
  console.log("🚀 ~ ChamadoPage ~ chamados:", chamados)
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
                <Text>{chamados.length} chamados</Text>
                <Badge colorScheme="red">{chamados.filter((item: any) => item.prioridade === "alta").length} críticos</Badge>
                <Badge colorScheme="green">{chamados.filter((item: any) => item.status === "EM_ANDAMENTO").length} abertos</Badge>
                <Badge colorScheme="yellow">{chamados.filter((item: any) => item.status === "LV2").length} nível 2</Badge>
              </Flex>
            </Box>
            <Flex>
              <Button as={Link} href="/chamado/novo" colorScheme="green">Novo Chamado</Button>
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
          <Flex flexDir={"column"} gap={2}>
            {/* card */}
            {chamados.map((item: any) => (
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
                    <Text fontSize={"md"} fontWeight={"bold"}>{item.titulo}</Text>
                    <Badge colorScheme="blue">{item.status}</Badge>
                    <Badge colorScheme="yellow">{item.prioridade}</Badge>
                  </Flex>
                  <Flex gap={2}>
                    <Text fontSize={"sm"}>Solicitante: {item.user_nome}</Text>•
                    <Text fontSize={"sm"}>Departamento: {item.departamento}</Text>
                  </Flex>
                  <Flex gap={4}>
                    <Code children={`ID: ${item.id}`} />
                    <Code children={`Aberto em: ${item.createAt}`} />
                    <Code children={`Última atualização: ${item.updatedAt}`} />
                  </Flex>
                </Flex>
                <Flex gap={2}>
                <BtnChamado name="Editar" id={item.id} type="edit"/>
                <BtnChamado name="Excluir" id={item.id} type="delete"/>
                </Flex>
              </Flex>
            </Box>
          ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
