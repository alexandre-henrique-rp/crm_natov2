/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { GetConstrutoraById } from "@/actions/getInfo/service/getConstrutoraById";
import { GetIncioFimSituacaoConstrutora } from "@/actions/relatorio_financeiro/service/getIncioFimSituacaoConstrutora";
import { GetProtocolo } from "@/actions/relatorio_financeiro/service/getProtocolo";
import SelectConstrutora from "@/components/selectConstrutora";
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
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

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
    if (TotalArray.length === 0) {
      toast({
        title: "Erro",
        description: "Preencha os dados e click em pesquisar",
        status: "error",
        duration: 9000,
        isClosable: true
      });
    }
    const DataConst =
      session?.user.hierarquia === "ADM"
        ? Number(Construtora)
        : session?.user.construtora[0].id;

    const ConsultApiCsv = await fetch("/api/doc/adm/cobranca/csv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        solicitacao: TotalArray,
        type: "Previa_relatorio",
        construtora: DataConst,
        Inicio: Inicio,
        Fim: Fim
      })
    });
    const data = await ConsultApiCsv.json();

    if (!ConsultApiCsv.ok) {
      toast({
        title: "Erro",
        description: data.message,
        status: "error",
        duration: 9000,
        isClosable: true
      });
    }

    const { csvContent, csvName } = data.data;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const linkCsv = document.createElement("a");
    const urlCsv = URL.createObjectURL(blob);
    linkCsv.setAttribute("href", urlCsv);
    linkCsv.setAttribute("download", csvName);
    linkCsv.style.visibility = "hidden";
    document.body.appendChild(linkCsv);
    linkCsv.click();
    document.body.removeChild(linkCsv);
  }

  const handleDownloadPDF = async (e: any) => {
    e.preventDefault();
    // separar id_fcw do array
    if (TotalArray.length === 0) {
      toast({
        title: "Erro",
        description: "Preencha os dados e click em pesquisar",
        status: "error",
        duration: 9000,
        isClosable: true
      });
      return;
    } else {
      const DataConst =
        session?.user.hierarquia === "ADM"
          ? Number(Construtora)
          : session?.user.construtora[0].id;

      const DataPost = {
        solicitacao: TotalArray,
        nota_fiscal: N_NotaFiscal,
        situacao_pg: Situacao === 0 ? Situacao + 1 : Situacao,
        construtora: DataConst,
        protocolo: ProtocoloNumber,
        Inicio: Inicio,
        Fim: Fim
      };

      const api = await fetch("/api/doc/adm/cobranca/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(DataPost)
      });
      const retorno = await api.json();

      if (retorno.error) {
        toast({
          title: "Erro",
          description: retorno.message,
          status: "error",
          duration: 9000,
          isClosable: true
        });
      }

      // Extrai o PDF e o nome do PDF da resposta
      const { pdf: htmlContent, pdfName } = retorno.data;

      // Crie um elemento temporário para inserir o HTML
      const tempElement = document.createElement("div");
      tempElement.innerHTML = htmlContent;
      document.body.appendChild(tempElement);

      // Usando jsPDF para gerar o PDF a partir do HTML
      const pdf = new jsPDF({
        orientation: "p", // orientação da página (retrato)
        unit: "mm", // unidade de medida (milímetros)
        format: "a4", // tamanho do papel A4
        precision: 2 // precisação de arredondamento
      });
      pdf.html(tempElement, {
        callback: (doc) => {
          doc.save(pdfName); // Salve o PDF com o nome fornecido
        },
        x: 5, // Margem da esquerda
        y: 5, // Margem superior
        width: 200, // Largura disponível (A4 - 20mm de margem)
        windowWidth: 690 // Largura da janela do conteúdo (ajuste conforme necessário)
      });

      // Remova o elemento temporário
      document.body.removeChild(tempElement);

      // //csv

      const ConsultApiCsv = await fetch("/api/doc/adm/cobranca/csv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          solicitacao: TotalArray,
          type: "relatorio_cobranca",
          construtora: DataConst,
          Inicio: Inicio,
          Fim: Fim
        })
      });
      const data = await ConsultApiCsv.json();

      if (!ConsultApiCsv.ok) {
        toast({
          title: "Erro",
          description: data.message,
          status: "error",
          duration: 9000,
          isClosable: true
        });
      }
      const { csvContent, csvName } = data.data;

      const blob2 = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const linkCsv = document.createElement("a");
      const urlCsv = URL.createObjectURL(blob2);
      linkCsv.setAttribute("href", urlCsv);
      linkCsv.setAttribute("download", csvName);
      linkCsv.style.visibility = "hidden";
      document.body.appendChild(linkCsv);
      linkCsv.click();
      document.body.removeChild(linkCsv);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      route.refresh();
    }
  };

  console.log(Protocolo);

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
                  <option value={1}>Aguardando Pagamento</option>
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

          {Personalizado && (
            <>
              <Flex gap={2}>
                <Button colorScheme="teal" onClick={handleDownload}>
                  Gerar Previa
                </Button>
                <Button
                  isDisabled={
                    !Personalizado && !Protocolo
                      ? true
                      : !!Protocolo
                      ? true
                      : false
                  }
                  onClick={handleDownloadPDF}
                >
                  Gerar cobrança
                </Button>
              </Flex>
            </>
          )}
          {Protocolo && (
            <>
              <Flex gap={2}>
                <Button colorScheme="teal" onClick={handleDownload}>
                  Gerar Previa
                </Button>
                <Button
                  isDisabled={
                    !Personalizado && !Protocolo
                      ? true
                      : !!Protocolo
                      ? true
                      : false
                  }
                  onClick={handleDownloadPDF}
                >
                  Gerar cobrança
                </Button>
              </Flex>
            </>
          )}
        </Flex>
      </Box>
    </>
  );
}
