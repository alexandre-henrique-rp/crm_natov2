"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Importando o plugin de rótulos
import React from "react";
import { Box } from "@chakra-ui/react";

// Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface TagData {
  descricao: string;
  quantidade: number;
}

interface BarChartProps {
  lista_tags: TagData[];
  labelTitle: string;
  dataQuantidades: number;
}

export default function BarChart({ lista_tags }: BarChartProps) {
  const maiorMenor = lista_tags.sort((a, b) => b.quantidade - a.quantidade);

  // Selecionar as 5 tags com mais quantidade
  const top5Tags = maiorMenor.slice(0, 5);

  // Agrupar o restante em "Outras"
  const outrasTags = maiorMenor.slice(5);
  const totalOutros = outrasTags.reduce((acc, tag) => acc + tag.quantidade, 0);

  // Novo array de tags com a categoria "Outras"
  const finalTags = [
    ...top5Tags,
    { descricao: "Outras", quantidade: totalOutros },
  ];

  // Definindo as cores personalizadas para as barras
  const colors = [
    "rgb(255, 165, 185)", // Rosa claro
    "rgb(255, 205, 155)", // Laranja claro
    "rgb(253, 224, 155)", // Amarelo claro
    "rgb(177, 255, 255)", // Verde claro
    "rgb(156, 215, 255)", // Azul claro
    "rgb(201, 173, 255)", // Roxo claro
  ];

  const data = {
    labels: finalTags.map((tag) => tag.descricao),
    display: false,
    datasets: [
      {
        label: "Quantidade",
        data: finalTags.map((tag) => tag.quantidade),
        backgroundColor: colors.slice(0, finalTags.length), // Atribui cores baseadas no número de tags
        borderColor: colors
          .slice(0, finalTags.length)
          .map((color) => color.replace("0.2", "1")), // Ajusta a borda para uma cor mais forte
        borderWidth: 1,
        barThickness: 80, // Ajuste a largura das barras
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Problemas Registrados :",
        position: "top" as const,
        align: "start" as const,
        font: {
          size: 16,
        },
        padding: {
          bottom: 15,
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
        callbacks: {
          label: (context: any) => {
            const descricao = finalTags[context.dataIndex].descricao;
            const quantidade = context.raw;
            return `${descricao}: ${quantidade} registros`;
          },
        },
      },
      datalabels: {
        color: "black",
        font: {
          size: 12,
        },
        formatter: (value: number) => `${value}`,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        display: true,
        title: {
          display: false,
          text: "Tags",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
          font: {
            size: 10,
          },
        },
      },
    },
    legend: {
      display: false, // Remover o ícone de filtro "Quantidade"
    },
  };

  return (
    <Box
    w="100%" mx="auto" borderRadius="md" p={2}
    >
      <Bar data={data} options={options} />
    </Box>
  );
}

