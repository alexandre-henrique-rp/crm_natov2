import BarChart from "@/components/barChart";
import LineChart from "@/components/lineChart.tsx";
import PieChart from "@/components/pieChart.tsx";
import { Flex, VStack, Text, Divider, Box, Select } from "@chakra-ui/react";
import { Metadata } from "next";

// Definir metadata
export const metadata: Metadata = {
  title: "DASHBOARD",
};

export default async function DashBoard() {
  // Função para buscar dados da API
  const fetchData = async () => {
    const response = await fetch(
      "http://localhost:3030/bot/atualiza/infos/global",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    return response.json();
  };

  const req = await fetchData();
  const data = req.infosGlobal;
  const tags = req.tags;
  // console.log("🚀 ~ DashBoard ~ tags:", tags)

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
  const totalVideoConferencia = arrayVideoConferencia.reduce(
    (acc: number, item: number) => acc + item,
    0
  );
  const totalInterna = arrayInterna.reduce(
    (acc: number, item: number) => acc + item,
    0
  );

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
    <Flex
      w="100%"
      px={{ base: 2, md: "10rem" }}
      py={5}
      flexDir="column"
      bg="white"
      align="center"
      justify="center"
      minH="100vh"
    >
      <VStack spacing={8} p={5} align="stretch" w="100%">
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="#00713C"
          textAlign="center"
        >
          Dashboard Global
        </Text>
        <Flex
          alignItems="flex-start"
          w="100%"
          gap={{ base: 4, md: 6 }}
          flexDir={{ base: "column", md: "row" }}
          justify="center"
          flexWrap="wrap" // Permite o wrap dos itens
        >
          {/* Gráfico de Linha com dados convertidos */}
          <LineChart
            labelTitle="Quantidade de Certificados:"
            labelTitle2="Media de Horas/Certificado:"
            dataQuantidades={totalSolicitacoesGlobal}
            dataMedia={mediaHorasGlobal}
            labels={mesAnoLabels}
            dataValues={MediaHorasConvertida}
          />

          {/* Gráfico de barra das tags */}
          <BarChart
            lista_tags={lista_tags}
            labelTitle="Quantidade de Tags: "
            dataQuantidades={quantidadeTags}
          />

          {/* Gráficos de Pizza */}
          <Flex flexDirection="row" gap={4} align="center">
            <PieChart
              title="Quantidade de RG e CNH"
              colors={["#1D1D1B", "#00713C"]}
              labels={["RG", "CNH"]}
              dataValues={[totalRG, totalCNH]}
            />
            <PieChart
              title="Video Conferencia e Presencial"
              colors={["#00713C", "#1D1D1B"]}
              labels={["Video Conf.", "Presencial"]}
              dataValues={[totalVideoConferencia, totalInterna]}
            />
          </Flex>
        </Flex>
        <Divider />
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="#00713C"
          textAlign="center"
        >
          Dashboard Filtrado
        </Text>
        <Box shadow={"md"} w={"100%"} bg={"white"}>
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
      </VStack>
    </Flex>
  );
}