// Componente RelatorioFinanceiro totalmente com Chakra UI
// Responsivo, didático e sem CSS puro ou classes globais
import {
  Box,
  Flex,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  Text,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosCheckmark, IoIosTrash } from "react-icons/io";

// Dados de exemplo (pode ser substituído por dados reais via props ou fetch)
const dados = [
  {
    id: "12345",
    nome: "João Silva",
    cpf: "123.456.789-10",
    status: "Aprovado",
    dataAprovacao: "14/10/2023",
    dataCadastro: "27/09/2023",
  },
  {
    id: "12346",
    nome: "Maria Oliveira",
    cpf: "987.654.321-00",
    status: "Pendente",
    dataAprovacao: "",
    dataCadastro: "04/10/2023",
  },
  {
    id: "12347",
    nome: "Carlos Santos",
    cpf: "456.789.123-45",
    status: "Em análise",
    dataAprovacao: "",
    dataCadastro: "09/10/2023",
  },
];

// Função utilitária para retornar o componente de status com cor
function getStatusTag(status: string) {
  if (status === "Aprovado") return <Tag colorScheme="green">Aprovado</Tag>;
  if (status === "Pendente") return <Tag colorScheme="yellow">Pendente</Tag>;
  return <Tag colorScheme="blue">Em análise</Tag>;
}

const HandleDelete = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/relatorio/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro ao deletar relatório");
    }
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const HandleEdit = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/relatorio/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Aprovado",
      }),
    });
    if (!response.ok) {
      throw new Error("Erro ao editar relatório");
    }
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Componente principal
export default function RelatorioFinanceiro() {
  const [busca, setBusca] = useState("");
  const toast = useToast();

  // Filtra os dados pelo nome ou CPF
  const dadosFiltrados = dados.filter(
    (item) =>
      item.nome.toLowerCase().includes(busca.toLowerCase()) ||
      item.cpf.replace(/\D/g, "").includes(busca.replace(/\D/g, ""))
  );

  async function DeleteRelatorioFinanceiro(id: string) {
    try {
      await HandleDelete(id);
      toast({
        title: "Relatório deletado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao deletar relatório",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  async function EditRelatorioFinanceiro(id: string) {
    try {
      await HandleEdit(id);
      toast({
        title: "Relatório editado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao editar relatório",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box
      bg="white"
      borderRadius="lg"
      p={{ base: 3, md: 6 }}
      boxShadow="md"
      w="100%"
    >
      {/* Cabeçalho e abas */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "start", md: "center" }}
        mb={4}
        gap={2}
      >
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
          Relatório Financeiro
        </Text>
      </Flex>
      {/* Busca e filtro */}
      <Flex
        gap={2}
        mb={4}
        align="center"
        bg="gray.50"
        borderRadius="md"
        p={3}
        flexWrap="wrap"
      >
        <Input
          placeholder="Buscar..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          maxW="300px"
          size="sm"
          bg="white"
        />
        <Button variant="outline" size="sm">
          Filtrar
        </Button>
      </Flex>
      {/* Tabela responsiva */}
      <Box overflowX="auto">
        <Table size="sm" variant="simple" minW="700px">
          <Thead bg="gray.50">
            <Tr>
              <Th>ID</Th>
              <Th>Construtora</Th>
              <Th>Protocolo</Th>
              <Th>Valor</Th>
              <Th>Status</Th>
              <Th>Data cadastro</Th>
              <Th>Data pagamento</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dadosFiltrados.length === 0 && (
              <Tr>
                <Td colSpan={7} textAlign="center" color="gray.400">
                  Nenhum resultado encontrado.
                </Td>
              </Tr>
            )}
            {dadosFiltrados.map((item) => (
              <Tr key={item.id} _hover={{ bg: "gray.50" }}>
                <Td>{item.id}</Td>
                <Td>{item.nome}</Td>
                <Td>{item.cpf}</Td>
                <Td>{item.cpf}</Td>
                <Td>{getStatusTag(item.status)}</Td>
                <Td>{item.dataAprovacao || "-"}</Td>
                <Td>{item.dataCadastro || "-"}</Td>
                <Td>
                  <IconButton
                    aria-label="Deletar relatório"
                    icon={<IoIosTrash />}
                    variant="outline"
                    size="sm"
                    onClick={() => DeleteRelatorioFinanceiro(item.id)}
                  />
                  <IconButton
                    aria-label="Pg confirmado"
                    icon={<IoIosCheckmark />}
                    variant="outline"
                    size="sm"
                    onClick={() => EditRelatorioFinanceiro(item.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
