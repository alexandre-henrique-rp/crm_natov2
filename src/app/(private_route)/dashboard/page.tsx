import GetConstrutoras from "@/actions/dashboard/services/getConstrutoras";
import GetEmpreendimentos from "@/actions/dashboard/services/getEmpreendimentos";
import GetFinanceiras from "@/actions/dashboard/services/getFinanceiras";
import BarChart from "@/components/barChart";
import CardInfoDashboard from "@/components/cardInfoDashboard";
import DashFiltrado from "@/components/dashFiltrado";
import LineChart from "@/components/lineChart.tsx";
import PieChart from "@/components/pieChart.tsx";
import { Flex, VStack, Text, Divider, Box } from "@chakra-ui/react";
import { BsClipboardCheck } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";
import { LuClipboardCheck, LuTag } from "react-icons/lu";

export default async function DashBoard() {
  // Função para buscar dados da API
  const fetchData = async () => {
    const response = await fetch(
      "https://dashboard.redebrasilrp.com.br/bot/atualiza/infos/global",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    console.log("🚀 ~ fetchData ~ response:", response);
    if (!response.ok) {
      console.log("teste");
    }
    return response.json();
  };

  const req = await fetchData();
  console.log("🚀 ~ DashBoard ~ req:", req);
  const data = req.infosGlobal;
  const tags = req.tags;
  // console.log("🚀 ~ DashBoard ~ tags:", tags)

  //Dados para o filtro
  const construtoras = await GetConstrutoras();
  const empreendimentos = await GetEmpreendimentos();
  const financeiras = await GetFinanceiras();
  // console.log("🚀 ~ DashBoard ~ empreendimentos:", empreendimentos)

  // Dados tags
  const lista_tags = tags.lista_tags;
  const quantidadeTags = tags.total_tags;

  //Quantidade Total Solicitacoes
  const totalSolicitacoes = data.map((item: any) => item.total);
  const totalSolicitacoesGlobal = totalSolicitacoes.reduce(
    (acc: number, item: number) => acc + item,
    0
  );

  // Extrair dados para cálculos
  const arrayVideoConferencia = data.map((item: any) => item.videoConferencia);
  const arrayInterna = data.map((item: any) => item.interna);
  let totalVideoConferencia = arrayVideoConferencia.reduce(
    (acc: number, item: number) => acc + item,
    0
  );
  let totalInterna = arrayInterna.reduce(
    (acc: number, item: number) => acc + item,
    0
  );

  const totalInternaPorcentagem = (
    (totalInterna / totalSolicitacoesGlobal) *
    100
  ).toFixed(1);

  if (+totalInternaPorcentagem < 10) {
    const valor = Math.round(totalSolicitacoesGlobal * 0.1);
    const valorTotal = valor + totalInterna;

    totalVideoConferencia = totalSolicitacoesGlobal - valorTotal;
    totalInterna = valorTotal;
  }

  // Dados de mês/ano para os labels
  const mesAnoLabels = data.map((item: any) => `${item.mes}/${item.ano}`);

  // Dados para o LineChart
  const arrayMediaHoras = data.map((item: any) => item.mediaHoras);

  // Função para converter tempo HH:mm:ss em segundos
  const timeToSeconds = (time: string): number => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const MediaHorasConvertida = arrayMediaHoras.map(timeToSeconds);

  function averageTimeInHours(secondsArray: number[]): string {
    const totalSeconds = secondsArray.reduce((acc, curr) => acc + curr, 0);
    const averageSeconds = totalSeconds / 6;

    const roundedAverageSeconds = Math.round(averageSeconds);

    const hours = Math.floor(averageSeconds / 3600);
    const minutes = Math.floor((averageSeconds % 3600) / 60);
    const seconds = roundedAverageSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }

  const mediaHorasGlobal = averageTimeInHours(MediaHorasConvertida);

  // Dados para o PieChart
  const arrayRG = data.map((item: any) => item.RG);
  const arrayCNH = data.map((item: any) => item.CNH);
  const totalRG = arrayRG.reduce((acc: number, item: number) => acc + item, 0);
  const totalCNH = arrayCNH.reduce(
    (acc: number, item: number) => acc + item,
    0
  );

  return (
    <>
      <Flex w={"full"} h={"full"} flexDir={"column"} p={2}>

        <Flex
          w={"100%"}
          h={"auto"}
          gap={"1%"}
          justifyContent={"space-around"}
          p={"20px"}
        >

          <CardInfoDashboard
            title={"Total Solicitações"}
            value={totalSolicitacoesGlobal}
            icon={<LuClipboardCheck />}
          />

          <CardInfoDashboard
            title={"Total Solicitações"}
            value={totalSolicitacoesGlobal}
            icon={<FaRegClock />}
          />
          <CardInfoDashboard
            title={"Total Solicitações"}
            value={totalSolicitacoesGlobal}
            icon={<LuTag />}
          />
        </Flex>
        <Flex justifyContent="space-around" gap="1%" wrap="wrap" p="1%">
          <Box
            flex="1 1 48%"
            minW="300px"
            border="1px solid #e2e8f0"
            shadow="md"
            rounded="md"
            p={12}
          >
            <LineChart labels={mesAnoLabels} dataValues={MediaHorasConvertida} />
          </Box>

          <Box
            flex="1 1 48%"
            minW="300px"
            border="1px solid #e2e8f0"
            shadow="md"
            rounded="md"
            p={12}
          >
            <BarChart
              lista_tags={lista_tags}
              labelTitle="Quantidade de Tags: "
              dataQuantidades={quantidadeTags}
            />
          </Box>
        </Flex>

        <Flex justifyContent="center" gap="1%" wrap="wrap" p="1%">

          <PieChart
            title="Quantidade de RG e CNH"
            colors={["#1D1D1B", "#00713C"]}
            labels={["RG", "CNH"]}
            dataValues={[totalRG, totalCNH]}
          />

          <PieChart
            title="Video Conferência e Presencial"
            colors={["#00713C", "#1D1D1B"]}
            labels={["Video Conf.", "Presencial"]}
            dataValues={[totalVideoConferencia, totalInterna]}
          />

        </Flex>

        <Box
          w="100%"
          borderTop="1px solid #e2e8f0"
          mt={8}
        >
          <DashFiltrado
            construtoras={construtoras}
            empreendimentos={empreendimentos}
            financeiras={financeiras}
            
          />
        </Box>

      </Flex>

    </>
    // <Flex
    //   w="100%"
    //   px={{ base: 2, md: "10rem" }}
    //   py={5}
    //   flexDir="column"
    //   bg="white"
    //   align="center"
    //   justify="center"
    //   minH="100vh"
    // >
    //   <VStack spacing={8} p={5} align="stretch" w="100%">
    //     <Text
    //       fontSize="3xl"
    //       fontWeight="bold"
    //       color="#00713C"
    //       textAlign="center"
    //     >
    //       Dashboard Global
    //     </Text>
    //     <Flex
    //       alignItems="flex-start"
    //       w="100%"
    //       gap={{ base: 4, md: 6 }}
    //       flexDir={{ base: "column", md: "row" }}
    //       justify="center"
    //       flexWrap="wrap" // Permite o wrap dos itens
    //     >
    //       {/* Gráfico de Linha com dados convertidos */}

    //       {/* Gráfico de barra das tags */}

    //       {/* Gráficos de Pizza */}
    //       <Flex flexDirection="row" gap={4} align="center">

    //       </Flex>
    //     </Flex>
    //     <Divider />

    // {/* <DashFiltrado
    //   construtoras={
    //     user?.hierarquia == "ADM" ? construtoras : user?.construtora
    //   }
    //   financeiras={
    //     user?.hierarquia == "ADM" ? financeiras : user?.Financeira
    //   }
    //   empreendimentos={
    //     user?.hierarquia == "ADM" ? empreendimentos : user?.empreendimento
    //   }
    // /> */}
    //   </VStack>
    // </Flex>
  );
}
