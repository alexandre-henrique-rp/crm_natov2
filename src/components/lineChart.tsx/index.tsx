"use client";
import { Box } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registra os componentes do Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

interface LineChartProps {
  labels: string[];
  dataValues: number[];
}

// Função para converter segundos para HH:mm:ss
function secondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
}

export default function LineChart({ labels, dataValues }: LineChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: "Média de Horas",
        data: dataValues,
        borderColor: "#00713C",
        backgroundColor: "#00713C",
        borderWidth: 2,
        fill: true,
        datalabels: {
          display: false,
        },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Média de Horas por Certificado",
        position: "top" as const,
        align: "start" as const,
        font: {
          size: 16,
        },
        padding: {
          bottom: 30,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            return `Horas: ${secondsToTime(value)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: "Horas",
        },
        ticks: {
          callback: function (tickValue: string | number) {
            return secondsToTime(Number(tickValue));
          },
        },
      },
    },
  };

  return (
    <Box
      h="auto"
      w={"full"}
      p={5}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      border={"1px solid #b8b8b8cc"}
    >
      <Line data={data} options={options} />
    </Box>
  );
}
