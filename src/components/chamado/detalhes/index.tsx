"use client";
import { Box, Flex, FormLabel, Input, Select, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useState } from "react";

interface DetalhesChamadoProps {
  Departamento: (value: string) => void;
  Prioridade: (value: string) => void;
  DthQru: (value: string) => void;
  cliente: (value: number) => void;
  data: any | null;
}

export const DetalhesChamadoComponent = ({
  Departamento,
  Prioridade,
  DthQru,
  cliente,
  data,
}: DetalhesChamadoProps) => {
  const [solicitacaoId, setSolicitacaoId] = useState<number>(0);
  const [departamento, setDepartamento] = useState<string>("");
  const [prioridade, setPrioridade] = useState<string>("");
  const [dthQru, setDthQru] = useState<string>("");
  const searchParams = useSearchParams();
  const IdParams = searchParams.get("id");

  useEffect(() => {
    if (IdParams) {
      setSolicitacaoId(Number(IdParams));
    }
    Departamento(departamento);
    Prioridade(prioridade);
    DthQru(dthQru);
    cliente(solicitacaoId);
  }, [IdParams, departamento, prioridade, dthQru, solicitacaoId]);

  if (data && data.id) {
    if (!departamento) {
      setDepartamento(data.departamento);
    }
    if (!prioridade) {
      setPrioridade(data.prioridade);
    }
    if (!dthQru) {
      setDthQru(data.dth_qru.split(":00")[0]);
    }
    if (!solicitacaoId) {
      setSolicitacaoId(data.solicitacaoId);
    }
  }
  return (
    <>
      <Flex w={"full"} gap={4} flexDir="column">
        <Box>
          <FormLabel>Departamento</FormLabel>
          <Input
            borderColor="gray.300"
            placeholder="Departamento"
            w={"100%"}
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
          />
        </Box>
        <Box>
          <FormLabel>Prioridade</FormLabel>
          <Select
            borderColor="gray.300"
            placeholder="Prioridade"
            w={"100%"}
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
          >
            <option value="baixa">Baixa</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </Select>
        </Box>
        <Flex gap={4}>
          <Box>
            <FormLabel>Data e hora do ocorrido</FormLabel>
            <Input
              borderColor="gray.300"
              type="datetime-local"
              placeholder="Data e hora do ocorrido"
              w={"100%"}
              value={dthQru}
              onChange={(e) => setDthQru(e.target.value)}
            />
          </Box>
          <Box>
            <FormLabel>Id da solicitação</FormLabel>
            <Suspense
              fallback={
                <Text color="red.500" fontSize="xs">
                  informe o id da solicitação
                </Text>
              }
            >
              <Input
                borderColor="gray.300"
                type="text"
                placeholder="Id da solicitação"
                w={"100%"}
                value={solicitacaoId.toString()}
                onChange={(e) => setSolicitacaoId(Number(e.target.value))}
              />
            </Suspense>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
