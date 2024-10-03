"use client";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Input,
  chakra,
  useToast
} from "@chakra-ui/react";
import SelectConstrutora from "../../selectConstrutora";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import { createForm } from "@/lib/pdf";
import { GetIncioFimSituacaoConstrutora } from "@/actions/relatorio_financeiro/service/getIncioFimSituacaoConstrutora";

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
  const [Situacao, setSituacao] = useState(0);
  const [TotalArray, setTotalArray] = useState<any>([]);
  const [Personalizado, setPersonalizado] = useState<boolean>(false);
  const [Protocolo, setProtocolo] = useState<boolean>(false);
  const [ProtocoloNumber, setProtocoloNumber] = useState<string>("");
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
  async function handlePesquisaProtocolo() {
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
    const dados = await GetIncioFimSituacaoConstrutora(Inicio, Fim, Situacao, Construtora);
    setTotalArray(dados);
  }


  async function handleDownload() {
    // Função para separar os objetos por id do empreendimento
    const separarPorEmpreendimentoId = () => {
      return TotalArray.reduce(
        (acc: Record<number, { nome: string; itens: any[] }>, Total: any) => {
          const empreendimentoId = Total.empreedimento.id;

          if (!acc[empreendimentoId]) {
            acc[empreendimentoId] = {
              nome: Total.empreedimento.nome,
              itens: []
            };
          }

          acc[empreendimentoId].itens.push(Total);

          return acc;
        },
        {}
      );
    };

    const dadosSeparados = separarPorEmpreendimentoId();

    // Criar cabeçalho do CSV no formato personalizado
    let csvContent = "";

    // Percorrer os dados por empreendimento e criar as linhas do CSV
    for (const [empreendimentoId, dados] of Object.entries(
      dadosSeparados
    ) as any) {
      // Adicionar o cabeçalho do empreendimento
      csvContent += `${dados.nome};;;\n;;;\n`;

      // Adicionar cabeçalho da tabela para cada empreendimento
      csvContent += `x;id;nome;cpf\n`;

      // Adicionar as linhas com os dados de cada item
      dados.itens.forEach((item: any, index: number) => {
        const linha = [
          index + 1, // Contador (x)
          item.id, // ID do item
          item.nome, // Nome do cliente
          item.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") // Formatar CPF
        ].join(";"); // Junta todos os campos com ponto e vírgula
        csvContent += linha + "\n"; // Adiciona a linha ao conteúdo CSV
      });

      // Adicionar separadores entre empreendimentos
      csvContent += `;;;\n;;;\n`;
    }

    // Criar um Blob do conteúdo CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Criar um link para o download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "relatorio.csv");
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleDownloadPDF = async () => {
    const pdf = await createForm(); // Supondo que 'createForm' retorna os dados em formato PDF

    // Criar um Blob do conteúdo PDF
    const blob = new Blob([pdf], { type: "application/pdf" });

    // Criar um link para o download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `relatorio.pdf`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <Box>Tipo de Relatório</Box>
          <Flex gap={2} w={"80%"}>
            <Checkbox onChange={(e)=> setProtocolo(e.target.checked)}>Protocolo</Checkbox>
            <Checkbox onChange={(e)=> setPersonalizado(e.target.checked)}>Personalizado</Checkbox>
          </Flex>
          <Box />
        </Flex>

        {Personalizado ? (
          <>
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
          </>
        ) : Protocolo ? (
          <>
            <Flex
              w={"100%"}
              gap={2}
              justifyContent={"space-between"}
              alignItems={"end"}
            >
              <Box>
                <FormLabel>Numero do Protocolo</FormLabel>
                <Input
                  type="date"
                  name="inicio"
                  onChange={(e) => setProtocoloNumber(e.target.value)}
                />
              </Box>

              <Button onClick={handlePesquisa}>Pesquisar</Button>
            </Flex>
          </>
        ) : (
          <>
            <Box w={"100%"} h={"10%"} />
          </>
        )}
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
          <Button onClick={handleDownloadPDF}>Gerar cobrança</Button>
        </Flex>
      </Box>
    </>
  );
}
