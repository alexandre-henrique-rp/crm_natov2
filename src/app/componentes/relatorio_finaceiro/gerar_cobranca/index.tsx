"use client";
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
import SelectConstrutora from "../../selectConstrutora";
import { useEffect, useState } from "react";
import { createForm } from "@/lib/pdf";
import { GetIncioFimSituacaoConstrutora } from "@/actions/relatorio_financeiro/service/getIncioFimSituacaoConstrutora";
import { GetProtocolo } from "@/actions/relatorio_financeiro/service/getProtocolo";
import { PostRelatorio } from "@/actions/relatorio_financeiro/service/postRelatorio";
import { useSession } from "next-auth/react";
import { GetConstrutoraById } from "@/actions/getInfo/service/getConstrutoraById";
import ApiCpnjJson from "@/actions/getInfo/api/apicnpj";

export default function GerarCobranca() {
  const [Inicio, setInicio] = useState("");
  const [Fim, setFim] = useState("");
  const [Construtora, setConstrutora] = useState(0);
  const [Situacao, setSituacao] = useState(0);
  const [TotalArray, setTotalArray] = useState<any>([]);
  const [Personalizado, setPersonalizado] = useState<boolean>(false);
  const [Protocolo, setProtocolo] = useState<boolean>(false);
  const [ProtocoloNumber, setProtocoloNumber] = useState<number>(0);
  const [N_NotaFiscal, setN_NotaFiscal] = useState<string>("");
  const toast = useToast();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.hierarquia === "CONST") {
      setConstrutora(session?.user.construtora[0].id);
    }
  }, [session?.user.hierarquia]);

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
    console.log("🚀 ~ handlePesquisa ~ dados.data:", dados.data);
    if (!dados.error) setTotalArray(dados.data);
  }

  async function handlePesquisaProtocolo() {
    console.log(ProtocoloNumber);
    const dados = await GetProtocolo(ProtocoloNumber);
    if (dados.error) {
      toast({
        title: "Erro",
        description: dados.message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
    console.log(dados.data?.solicitacao);
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

  console.log(session?.user);
  const handleDownloadPDF = async () => {
    // separar id_fcw do array
    // const ids = TotalArray.map((item: any) => item.id_fcw);
    // console.log("ids:", ids);

    // const DataPost = {
    //   solicitacao: ids,
    //   ...(N_NotaFiscal !== "" && { nota_fiscal: N_NotaFiscal }),
    //   situacao_pg: 1,
    //   construtora:Number(Construtora)
    // };

    //  const response = await PostRelatorio(DataPost);
    //  console.log("🚀 ~ handleDownloadPDF ~ response:", response)

    const construtoraInfo =
      session?.user.hierarquia === "ADM"
        ? await GetConstrutoraById(Number(Construtora))
        : await GetConstrutoraById(session?.user.construtora[0].id);
    const complementoCnpj: any =
      construtoraInfo && (await ApiCpnjJson(construtoraInfo.cnpj));

      if (complementoCnpj.error) {
        toast({
          title: "Erro",
          description: complementoCnpj.message,
          status: "error",
          duration: 3000,
          isClosable: true
        });
      }
    const DadosConst = {
      nome: complementoCnpj.data.razao_social,
      telefone: construtoraInfo?.tel?.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4"),
      email: construtoraInfo?.email,
      cnpj: construtoraInfo?.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"),
      // end: "R. Américo Brasiliense, 284 - 3° Andar Sala 32 - Centro, Ribeirão Preto - SP, 14015-050"
      end: `${complementoCnpj.data.estabelecimento.tipo_logradouro} ${complementoCnpj.data.estabelecimento.logradouro}, ${complementoCnpj.data.estabelecimento.numero}, ${complementoCnpj.data.estabelecimento.complemento}, ${complementoCnpj.data.estabelecimento.bairro}, ${complementoCnpj.data.estabelecimento.cidade} - ${complementoCnpj.data.estabelecimento.uf}, ${complementoCnpj.data.estabelecimento.cep?.replace(/(\d{5})(\d{3})/, "$1-$2")}`
    };

    const ValorCert = construtoraInfo?.valor_cert? construtoraInfo?.valor_cert : 0

    const valorTotal = ValorCert ? TotalArray.length * ValorCert : 0;
    const valorUnicoFormatado = ValorCert.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
    const valorTotalFormatado = valorTotal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    const msg = `Certificados emitidos pelo "AR Interface certificador" no período de ${Inicio.split("-").reverse().join("/")} a ${Fim.split("-").reverse().join("/")}, com o valor total de ${valorUnicoFormatado} cada certificado, com validade de 1 ano.`;


    const pdf = await createForm(DadosConst,valorTotalFormatado, TotalArray.length, msg); // Supondo que 'createForm' retorna os dados em formato PDF

    // Criar um Blob do conteúdo PDF
    const blob = new Blob([pdf], { type: "application/pdf" });

    // Criar um link para o download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    // link.setAttribute("href", url);
    // link.setAttribute("download", `relatorio.pdf`);
    // link.style.visibility = "hidden";

    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
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
      <Box w={"65%"} h={"47vh"} p={5} rounded="lg" boxShadow="2xl">
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
                  onChange={(e) => setProtocoloNumber(Number(e.target.value))}
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
            <Button colorScheme="teal" onClick={handleDownload}>
              Gerar Previa
            </Button>
            <Button
              isDisabled={
                !Personalizado && !Protocolo ? true : !!Protocolo ? true : false
              }
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
