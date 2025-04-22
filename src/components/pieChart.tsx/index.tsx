"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Importa o plugin para os rótulos de dados
import { FaChartPie } from "react-icons/fa6";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels); // Registra o plugin

interface PieChartProps {
  labels: string[];
  dataValues: number[];
  colors?: string[];
  title?: string;
}

export default function PieChart({
  labels,
  dataValues,
  colors,
  title,
}: PieChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: "Solicitações",
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: title,
      },
      datalabels: {
        display: true,
        color: "white",
        font: {
          weight: "bold" as const,
          size: 12,
        },
        formatter: (value: number, ctx: any) => {
          const total = ctx.dataset.data.reduce(
            (acc: number, val: number) => acc + val,
            0
          );
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
      },
      tooltip: {
        intersect: false,
        backgroundColor: "#FFFFFF",
        titleColor: "#000000",
        bodyColor: "#00713C",
        borderColor: "#00713C",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 6,
        displayColors: false,
      },
    },
  };

  return (
    <Flex
      p={4}
      w={"40%"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
    >
      <Flex w={"100%"} gap={2} justifyContent={"center"}>
        <FaChartPie />
        <Text fontWeight={"bold"}>{title}</Text>
      </Flex>
      <Box
        w={"50%"}
        bg={"white"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Pie data={data} options={options} />
      </Box>
    </Flex>
  );
}
