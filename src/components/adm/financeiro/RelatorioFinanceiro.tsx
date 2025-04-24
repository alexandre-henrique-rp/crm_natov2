// Componente RelatorioFinanceiro totalmente com Chakra UI
// Responsivo, didático e sem CSS puro ou classes globais
import {
  Box, Flex, Button, Input, Table, Thead, Tbody, Tr, Th, Td, Tag, Text
} from "@chakra-ui/react";
import { useState } from "react";

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

// Componente principal
export default function RelatorioFinanceiro() {
  const [busca, setBusca] = useState("");

  // Filtra os dados pelo nome ou CPF
  const dadosFiltrados = dados.filter(
    (item) =>
      item.nome.toLowerCase().includes(busca.toLowerCase()) ||
      item.cpf.replace(/\D/g, "").includes(busca.replace(/\D/g, ""))
  );

  return (
    <Box bg="white" borderRadius="lg" p={{ base: 3, md: 6 }} boxShadow="md" w="100%">
      {/* Cabeçalho e abas */}
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "start", md: "center" }} mb={4} gap={2}>
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">Relatório Financeiro</Text>
        <Flex gap={2} mt={{ base: 2, md: 0 }}>
          <Button variant="outline" size="sm">Tipo de Relatório</Button>
          <Button variant="outline" size="sm">Protocolo</Button>
          <Button variant="outline" size="sm">Personalizado</Button>
        </Flex>
      </Flex>
      {/* Busca e filtro */}
      <Flex gap={2} mb={4} align="center" bg="gray.50" borderRadius="md" p={3} flexWrap="wrap">
        <Input
          placeholder="Buscar..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          maxW="300px"
          size="sm"
          bg="white"
        />
        <Button variant="outline" size="sm">Filtrar</Button>
      </Flex>
      {/* Tabela responsiva */}
      <Box overflowX="auto">
        <Table size="sm" variant="simple" minW="700px">
          <Thead bg="gray.50">
            <Tr>
              <Th>#</Th>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>CPF</Th>
              <Th>Status</Th>
              <Th>Data aprovação</Th>
              <Th>Data cadastro</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dadosFiltrados.length === 0 && (
              <Tr>
                <Td colSpan={7} textAlign="center" color="gray.400">Nenhum resultado encontrado.</Td>
              </Tr>
            )}
            {dadosFiltrados.map((item, idx) => (
              <Tr key={item.id} _hover={{ bg: "gray.50" }}>
                <Td>{idx + 1}</Td>
                <Td>{item.id}</Td>
                <Td>{item.nome}</Td>
                <Td>{item.cpf}</Td>
                <Td>{getStatusTag(item.status)}</Td>
                <Td>{item.dataAprovacao || "-"}</Td>
                <Td>{item.dataCadastro || "-"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
