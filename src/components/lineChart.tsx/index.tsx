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
        fill: true,
        borderColor: "#00713C",
        borderWidth: 2,
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#00713C",
        pointHoverBackgroundColor: "#00713C",
        pointHoverBorderColor: "#00713C",
        pointRadius: 6,
        pointHoverRadius: 7,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
      axis: "x" as const,
    },
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Média de Horas por Certificado",
        align: "start" as const, // Aqui está o fix
        font: { size: 16 },
        padding: { bottom: 30 },
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
        callbacks: {
          title: (ctx: any) => `Data: ${ctx[0].label}`,
          label: (ctx: any) => `Horas: ${secondsToTime(ctx.raw)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: string | number) {
            return secondsToTime(Number(tickValue));
          },
        },
        grid: {
          display: false,
          drawOnChartArea: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Box w="100%" mx="auto" borderRadius="md" p={2}>
      <Line data={data} options={options} />
    </Box>
  );
}
