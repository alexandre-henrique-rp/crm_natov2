"use client";
import { AnosOptions } from "@/data/anos";
import { MesesOptions } from "@/data/meses";
import { Box, Select, Button, useToast, Flex } from "@chakra-ui/react";
import { useState } from "react";
import BarChart from "../barChart";
import LineChart from "../lineChart.tsx";
import PieChart from "../pieChart.tsx";

interface DashFiltradoProps {
  construtoras: any;
  empreendimentos: any;
  financeiras: any;
}

export default function DashFiltrado({
  construtoras,
  empreendimentos,
  financeiras,
}: DashFiltradoProps) {
  const [mes, setMes] = useState<string | null>(null);
  const [ano, setAno] = useState<string | null>(null);
  const [construtora, setConstrutora] = useState<string | null>(null);
  const [empreedimento, setEmpreendimento] = useState<string | null>(null);
  const [financeiro, setFinanceira] = useState<string | null>(null);
  const [dados, setDados] = useState<any | null>(null);
  const toast = useToast()

  const handleSubmit = async () => {
    const data = {
        mes,
        ano,
        construtora,
        empreedimento,
        financeiro
    }
    try {
        const req = await fetch('http://localhost:3030/get/infos/search',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json" 
           },
           body: JSON.stringify(data)
           
        })
   
        if (!req.ok) {
           toast({
             title: "Erro no Filtro",
             description: `Não foi possível buscar os dados. Status: ${req.status} - ${req.statusText}`,
             status: "error", 
             duration: 5000, 
             isClosable: true,
             position: "top-right" 
           });
           return;
         }else{

             const result = await req.json()
             console.log("🚀 ~ handleSubmit ~ result:", result)
             setDados(result)
            
             toast({
                title: "Sucesso!",
                description: "Dados filtrados com sucesso.",
                status: "success", 
                duration: 3000,
                isClosable: true,
                position: "top-right"
              });
         }   
       
    } catch (error) {
        toast({
            title: "Erro no Servidor",
            description: "Ocorreu um erro ao tentar buscar os dados. Tente novamente mais tarde.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right"
          });
          console.error("Erro:", error);
        
    }
  }

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} gap={2} w={"100%"}>
        <Select
          w={"135px"}
          placeholder="Mês"
          onChange={(e) => setMes(e.target.value)}
        >
          {MesesOptions.map((mes) => (
            <option key={mes.id} value={mes.id}>
              {mes.label}
            </option>
          ))}
        </Select>
        <Select
          w={"100px"}
          placeholder="Ano"
          onChange={(e) => setAno(e.target.value)}
        >
          {AnosOptions.map((ano) => (
            <option key={ano.id} value={ano.ano}>
              {ano.ano}
            </option>
          ))}
        </Select>
        <Select
          w={"200px"}
          placeholder="Construtora"
          onChange={(e) => setConstrutora(e.target.value)}
        >
          {construtoras?.map((construtora: any) => (
            <option key={construtora.id} value={construtora.id}>
              {construtora.fantasia}
            </option>
          ))}
        </Select>
        <Select
          w={"200px"}
          placeholder="Empreendimento"
          onChange={(e) => setEmpreendimento(e.target.value)}
        >
          {empreendimentos?.map((empreendimento: any) => (
            <option key={empreendimento.id} value={empreendimento.id}>
              {empreendimento.nome}
            </option>
          ))}
        </Select>
        <Select w={"200px"} placeholder="Financeira" onChange={(e) => setFinanceira(e.target.value)}>
          {financeiras?.map((financeira: any) => (
            <option key={financeira.id} value={financeira.id}>
              {financeira.fantasia}
            </option>
          ))}
        </Select>
        <Button shadow={'md'} colorScheme={'teal'} onClick={handleSubmit}>
            Filtrar
        </Button>
      </Box>
      <Flex
          alignItems="flex-start"
          w="100%"
          gap={{ base: 4, md: 6 }}
          flexDir={{ base: "column", md: "row" }}
          justify="center"
          flexWrap="wrap" // Permite o wrap dos itens
        >
          {/* Gráfico de Linha com dados convertidos */}
          {/* <LineChart
            labelTitle="Quantidade de Certificados:"
            labelTitle2="Media de Horas/Certificado:"
            dataQuantidades={dados.total_solicitacao}
            dataMedia={data.time}
            labels={mesAnoLabels}
            dataValues={MediaHorasConvertida}
          /> */}

          {/* Gráfico de barra das tags */}
          {/* <BarChart
            lista_tags={lista_tags}
            labelTitle="Quantidade de Tags: "
            dataQuantidades={quantidadeTags}
          /> */}

          {/* Gráficos de Pizza */}
          {/* <Flex flexDirection="row" gap={4} align="center">
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
          </Flex> */}
        </Flex>
    </>
  );
}
