/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import ApiCpnjJson from "@/actions/getInfo/api/apicnpj";
import { GetConstrutoraById } from "@/actions/getInfo/service/getConstrutoraById";
import { GetIncioFimSituacaoConstrutora } from "@/actions/relatorio_financeiro/service/getIncioFimSituacaoConstrutora";
import { GetProtocolo } from "@/actions/relatorio_financeiro/service/getProtocolo";
import { PostRelatorio } from "@/actions/relatorio_financeiro/service/postRelatorio";
import SelectConstrutora from "@/components/selectConstrutora";
import { createForm } from "@/lib/pdf";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Input,
  Select,
  useToast
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

export default function GerarCobranca() {
  const [Inicio, setInicio] = useState("");
  const [Fim, setFim] = useState("");
  const [Construtora, setConstrutora] = useState(0);
  const [Situacao, setSituacao] = useState(0);
  const [TotalArray, setTotalArray] = useState<any>([]);
  const [Personalizado, setPersonalizado] = useState<boolean>(false);
  const [Protocolo, setProtocolo] = useState<boolean>(false);
  const [ProtocoloNumber, setProtocoloNumber] = useState<string>("");
  const [N_NotaFiscal, setN_NotaFiscal] = useState<string>("");
  const toast = useToast();
  const { data: session } = useSession();
  const route = useRouter();

  useEffect(() => {
    if (session?.user.hierarquia === "CONST") {
      setConstrutora(session?.user.construtora[0].id);
    }
  }, [session?.user.construtora, session?.user.hierarquia]);

  async function handlePesquisa() {
    const dados = await GetIncioFimSituacaoConstrutora(
      Inicio,
      Fim,
      Situacao,
      Construtora
    );
    if (dados.error) {
      toast({
        title: "Erro",
        description: dados.message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
    if (!dados.error) setTotalArray(dados.data);
  }

  async function handlePesquisaProtocolo() {
    const dados: any = await GetProtocolo(ProtocoloNumber);
    console.log("🚀 ~ handlePesquisaProtocolo ~ dados:", dados);
    if (dados.error) {
      toast({
        title: "Erro",
        description: dados.message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
    setInicio(dados.data?.start.split("T")[0]);
    setFim(dados.data?.end.split("T")[0]);
    setSituacao(dados.data?.situacao_pg);
    setN_NotaFiscal(dados.data?.nota_fiscal);
    setSituacao(dados.data?.situacao_pg);
    setConstrutora(dados.data?.construtora?.id);
    setTotalArray(dados.data?.solicitacao);
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
    let csvContent = "\uFEFF";
    const ifocontrutora = await GetConstrutoraById(Construtora);
    // Percorrer os dados por empreendimento e criar as linhas do CSV
    csvContent += `${ifocontrutora?.fantasia};${Inicio.split("-")
      .reverse()
      .join("-")} - ${Fim.split("-").reverse().join("-")};;\n;;;\n`;
    for (const [empreendimentoId, dados] of Object.entries(
      dadosSeparados
    ) as any) {
      // Adicionar o cabeçalho do empreendimento
      csvContent += `${dados.nome};;;\n;;;\n`;
      // Adicionar cabeçalho da tabela para cada empreendimento
      csvContent += `x;id;nome;cpf;dtAprovacao;CCA;Cidade;solicitante\n`;
      // Adicionar as linhas com os dados de cada item
      console.log(dados.itens);
      dados.itens.forEach((item: any, index: number) => {
        const linha = [
          index + 1, // Contador (x)
          item.id, // ID do item
          item.nome, // Nome do cliente
          item.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
          item.dt_aprovacao.split("T")[0].split("-").reverse().join("/"),
          item.financeiro?.fantasia,
          item.empreedimento?.cidade,
          item.corretor?.nome
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
    link.setAttribute(
      "download",
      `Previa_relatorio_${ifocontrutora?.fantasia}_${Inicio.split("-")
        .reverse()
        .join("-")}_${Fim.split("-").reverse().join("-")}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleDownloadPDF = async (e: any) => {
    e.preventDefault();
    // separar id_fcw do array
    const DataPost = {
      solicitacao: TotalArray,
      nota_fiscal: N_NotaFiscal,
      situacao_pg: Situacao === 0 ? Situacao + 1 : Situacao,
      construtora:
        session?.user.hierarquia === "ADM"
          ? Number(Construtora)
          : session?.user.construtora[0].id,
      protocolo: ProtocoloNumber,
      Inicio: Inicio,
      Fim: Fim
    };

    if (TotalArray.length === 0) {
    }
    const api = await fetch("/api/doc/adm/cobranca", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(DataPost)
    });
    const retorno = await api.json();
    console.log("🚀 ~ handleDownloadPDF ~ retorno:", retorno);

    // const blob = new Blob([retorno.pdf], { type: "application/pdf" });
    // // Criar um link para o download
    // const link = document.createElement("a");
    // const url = URL.createObjectURL(blob);
    // // window.open(url, "_blank");
    // link.setAttribute("href", url);
    // link.setAttribute("download", retorno.pdfName);
    // link.style.visibility = "hidden";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    // //csv

    // const blobCsv = new Blob([retorno.csvContent], {
    //   type: "text/csv;charset=utf-8;"
    // });
    // // Criar um link para o download
    // const linkCsv = document.createElement("a");
    // const urlCsv = URL.createObjectURL(blobCsv);
    // linkCsv.setAttribute("href", urlCsv);
    // linkCsv.setAttribute("download", retorno.csvName);
    // linkCsv.style.visibility = "hidden";
    // document.body.appendChild(linkCsv);
    // linkCsv.click();
    // document.body.removeChild(linkCsv);
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // route.refresh();
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
      <Box
        w={{ base: "100%", md: "65%" }}
        h={"70vh"}
        p={5}
        rounded="lg"
        boxShadow="2xl"
      >
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
            <Checkbox
              onChange={(e) => {
                setProtocolo(e.target.checked);
                setPersonalizado(false);
              }}
              checked={Protocolo}
            >
              Protocolo
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                setPersonalizado(e.target.checked);
                setProtocolo(false);
              }}
              checked={Personalizado}
            >
              Personalizado
            </Checkbox>
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
                  size={"sm"}
                  borderRadius={"md"}
                  onChange={(e) => setInicio(e.target.value)}
                />
              </Box>

              <Box>
                <FormLabel>Data Fim</FormLabel>
                <Input
                  type="date"
                  name="fim"
                  size={"sm"}
                  borderRadius={"md"}
                  onChange={(e) => setFim(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Tipo de situação</FormLabel>
                <Select
                  size={"sm"}
                  borderRadius={"md"}
                  onChange={(e) => setSituacao(Number(e.target.value))}
                  value={Situacao}
                >
                  <option value={0}>Pendente</option>
                  <option value={1}>Agradando Pagamento</option>
                  <option value={2}>Pago</option>
                </Select>
              </Box>
              {session?.user.hierarquia === "ADM" && (
                <Box>
                  <FormLabel>construtora</FormLabel>
                  <SelectConstrutora
                    size={"sm"}
                    borderRadius={"md"}
                    onChange={(e) => setConstrutora(Number(e.target.value))}
                  />
                </Box>
              )}
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
                  type="number"
                  name="protocolo"
                  size={"sm"}
                  onChange={(e) => setProtocoloNumber(e.target.value)}
                />
              </Box>

              <Button onClick={handlePesquisaProtocolo}>Pesquisar</Button>
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
                        ? item.dt_aprovacao
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")
                        : ""}
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
        <Flex w={"100%"} justifyContent={"space-between"}>
          {Personalizado ? (
            <>
              <Flex>
                <FormLabel>Nº nota fiscal</FormLabel>
                <Input
                  size={"sm"}
                  borderRadius={"md"}
                  w={"7rem"}
                  onChange={(e) => setN_NotaFiscal(e.target.value)}
                />
              </Flex>
            </>
          ) : (
            <>
              <Box />
            </>
          )}
          <Flex gap={2}>
            <Button
              colorScheme="teal"
              onClick={handleDownload}
              isDisabled={
                !Personalizado && !Protocolo ? true : !!Protocolo ? true : false
              }
            >
              Gerar Previa
            </Button>
            <Button
              // isDisabled={
              //   !Personalizado && !Protocolo ? true : !!Protocolo ? true : false
              // }
              onClick={handleDownloadPDF}
            >
              Gerar cobrança
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
