"use client";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FiFilter, FiX } from "react-icons/fi";
import { useState } from "react";



interface DashFiltradoProps {
    construtoras: any[];
    empreendimentos: any[];
    financeiras: any[];
    onFilter?: (params: {
      dataInicio: any | null;
      dataFim: any | null;
      construtora: any;
      empreendimento?: any | null;
      financeira?: any | null;
    }) => void;
  }

export default function DashFiltrado({
  construtoras,
  empreendimentos,
  financeiras,
  onFilter,
}: DashFiltradoProps) {
  const toast = useToast();

  const [dataInicio, setDataInicio] = useState<string | null>(null);
  const [dataFim, setDataFim] = useState<string | null>(null);
  const [construtora, setConstrutora] = useState("");
  const [empreendimento, setEmpreendimento] = useState<string | null>(null);
  const [financeira, setFinanceira] = useState<string | null>(null);

  const limpar = () => {
    setDataInicio(null);
    setDataFim(null);
    setConstrutora("");
    setEmpreendimento(null);
    setFinanceira(null);
    onFilter?.({
      dataInicio: null,
      dataFim: null,
      construtora: "",
      empreendimento: null,
      financeira: null,
    });
  };

  const filtrar = () => {
    if (!construtora) {
      toast({
        status: "warning",
        title: "Selecione uma Construtora",
        isClosable: true,
      });
      return;
    }
    onFilter?.({
      dataInicio,
      dataFim,
      construtora,
      empreendimento,
      financeira,
    });
  };

  return (
    <Flex
      w="100%"
      p={4}
      gap={4}
      bg="#F8F8F8"
      flexWrap="wrap"
      align="center"
      justify="space-around"
      borderTop="1px solid #e2e8f0"
    >
      {/* Data Início */}
      <FormControl flex="1 1 180px">
        <FormLabel fontSize="sm">Data Início</FormLabel>
        <Input
          type="date"
          value={dataInicio ?? ""}
          onChange={(e) => setDataInicio(e.target.value || null)}
          bg="white"
        />
      </FormControl>

      {/* Data Fim */}
      <FormControl flex="1 1 180px">
        <FormLabel fontSize="sm">Data Fim</FormLabel>
        <Input
          type="date"
          value={dataFim ?? ""}
          onChange={(e) => setDataFim(e.target.value || null)}
          bg="white"
        />
      </FormControl>

      {/* Construtora (obrigatório) */}
      <FormControl flex="1 1 200px" isRequired>
        <FormLabel fontSize="sm">Construtora</FormLabel>
        <Select
          bg="#F5F6F8"
          value={construtora}
          onChange={(e) => setConstrutora(e.target.value)}
        >
          <option value="">Selecione…</option>
          {construtoras.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </FormControl>


      <FormControl flex="1 1 200px">
        <FormLabel fontSize="sm">Empreendimento</FormLabel>
        <Select
          bg="#F5F6F8"
          value={empreendimento ?? ""}
          onChange={(e) => setEmpreendimento(e.target.value || null)}
        >
          <option value="">Todos</option>
          {empreendimentos.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl flex="1 1 200px">
        <FormLabel fontSize="sm">Financeira</FormLabel>
        <Select
          bg="#F5F6F8"
          value={financeira ?? ""}
          onChange={(e) => setFinanceira(e.target.value || null)}
        >
          <option value="">Todas</option>
          {financeiras.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </Select>
      </FormControl>


      <Flex gap={2} mt={{ base: 4, md: 0 }}>
        <Button
          leftIcon={<FiFilter />}
          bg="#00713C"
          color="white"
          _hover={{ bg: "#01592d" }}
          onClick={filtrar}
        >
          Filtrar
        </Button>
        <Button
          leftIcon={<FiX />}
          variant="outline"
          onClick={limpar}
          bg="white"
        >
          Limpar
        </Button>
      </Flex>
    </Flex>
  );
}
