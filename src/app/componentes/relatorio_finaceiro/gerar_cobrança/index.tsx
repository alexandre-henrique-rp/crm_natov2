"use client";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  chakra,
  useToast
} from "@chakra-ui/react";
import SelectConstrutora from "../../selectConstrutora";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";

const prisma = new PrismaClient();

const Requeste = async (inicio: any, fim: any, construtora: any) => {
  const request = await fetch(`/api/get_relatorio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inicio,
      fim,
      construtora
    }),
    cache: "no-store"
  });
  const data = await request.json();
  return data;
};
export default function GerarCobranca() {
  const [Inicio, setInicio] = useState("");
  const [Fim, setFim] = useState("");
  const [Construtora, setConstrutora] = useState(0);
  const [TotalArray, setTotalArray] = useState<any>([]);
  const toast = useToast();
  async function handlePesquisa() {
    if (Construtora === 0) {
      toast({
        title: "Erro",
        description: "Selecione uma construtora",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
    if (!Inicio || !Fim) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
    const dados = await Requeste(Inicio, Fim, Construtora);
    setTotalArray(dados);
  }

  async function handleDownload() {
    // Função para separar os objetos por id do empreendimento
    const separarPorEmpreendimentoId = () => {
      const dados = TotalArray.reduce((acc: any, Total: any) => {
        const empreendimentoId = Total.empreendimento.id;
        
        // Se o id do empreendimento ainda não existe no acumulador, cria uma lista para ele
        if (!acc[empreendimentoId]) {
          acc[empreendimentoId] = {
            nome: Total.empreendimento.nome,
            itens: []
          };
        }
        
        // Adiciona o objeto à lista do empreendimento correspondente
        acc[empreendimentoId].itens.push(Total);
        
        return acc;
      }, {});
    };
    console.log("🚀 ~ separarPorEmpreendimentoId ~ separarPorEmpreendimentoId:", separarPorEmpreendimentoId)
    
  }

  return (
    <>
      <style>
        {` 
          tr:nth-child(even) {
            background-color: #dddddd;
          }
          
          td {
           padding-inline: 5px;
           font-size: 0.8rem;
          }

        `}
      </style>
      <Box w={"65%"} h={"40vh"} p={5} rounded="lg" boxShadow="2xl">
        <Box w={"100%"} textAlign={"center"}>
          Relatório Financeiro
        </Box>
        <Flex
          w={"100%"}
          gap={2}
          justifyContent={"space-around"}
          alignItems={"end"}
        >
          <Box>
            <FormLabel>Data Inicio</FormLabel>
            <Input
              type="date"
              name="inicio"
              onChange={(e) => setInicio(e.target.value)}
            />
          </Box>

          <Box>
            <FormLabel>Data Fim</FormLabel>
            <Input
              type="date"
              name="fim"
              onChange={(e) => setFim(e.target.value)}
            />
          </Box>
          <Box>
            <FormLabel>construtora</FormLabel>
            <SelectConstrutora
              onChange={(e) => setConstrutora(Number(e.target.value))}
            />
          </Box>
          <Button onClick={handlePesquisa}>Pesquisar</Button>
        </Flex>
        <Box w={"100%"} h={"70%"} bg={"gray.100"} overflowX={"auto"} my={2}>
          <table style={{ width: "100%" }}>
            <tr style={{ position: "sticky", top: 0, background: "#f2f2f2" }}>
              <th>x</th>
              <th>id</th>
              <th>nome</th>
              <th>cpf</th>
              <th>status</th>
              <th>Data aprovação</th>
              <th>Data cadastro</th>
            </tr>
            {TotalArray.length > 0 &&
              TotalArray.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.nome}</td>
                    <td>
                      {item.cpf.replace(
                        /(\d{3})(\d{3})(\d{3})(\d{2})/,
                        "$1.$2.$3-$4"
                      )}
                    </td>
                    <td>{item.estatos_pgto}</td>
                    <td style={{ textAlign: "center" }}>
                      {item.dt_aprovacao
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {item.createdAt
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </td>
                  </tr>
                );
              })}
          </table>
        </Box>
        <Flex w={"100%"} justifyContent={"end"} gap={2}>
          <Button colorScheme="teal" onClick={handleDownload}>
            Gerar Previa
          </Button>
          <Button>Gerar cobrança</Button>
        </Flex>
      </Box>
    </>
  );
}
