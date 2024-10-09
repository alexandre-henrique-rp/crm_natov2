"use client";
import { GetProtocolo } from "@/actions/relatorio_financeiro/service/getProtocolo";
import { Box, Button, Flex, FormLabel, Heading, IconButton, Input, Text, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function ConfirPg() {
  const { data: session } = useSession();
  const toast = useToast();
  const [ProtocoloNumber, setProtocoloNumber] = useState("");
  const [totalArray, setTotalArray] = useState<any | null>(null);


  async function handlePesquisaProtocolo() {
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
    if (!dados.error) setTotalArray(dados.data);
  }

  return (
    <>
      {session?.user?.hierarquia === "ADM" ? (
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
          <Box w={"full"} h={"26vh"} p={5} rounded="lg" boxShadow="2xl">
            <Box w={"100%"} textAlign={"center"}>
              <Heading size="md">Registrar Pagamento</Heading>
            </Box>
            <Flex w={"100%"} flexDir={"column"} justifyContent={"space-between"}>
              <Flex w={"100%"} h={'16vh'} p={3} mt={2} gap={2} flexDir={"column"} borderBottom={'1px solid #000'}>
                { totalArray && (
<>
</>
                )}
                {/* <Text>Protocolo: {ProtocoloNumber}</Text>
                <Text>Expedido em: {totalArray[0]?.createdAt.split('T')[0].split('-').reverse().join('/')}</Text>
                {totalArray[0]?.construtora?.fantasia && (
                  <>
                    <Text>Construtora: {totalArray[0]?.construtora?.fantasia}</Text>
                  </>
                )} */}
              </Flex>
              <Flex w={"100%"} p={3} gap={2} alignItems={"end"} justifyContent={"space-between"}>
                <Box>
                  <FormLabel m={0}>Protocolo: </FormLabel>
                  <Flex gap={2}>
                  <Input type="text" size={"sm"} w={'9rem'} rounded={'lg'} onChange={(e) => setProtocoloNumber(e.target.value)}/>
                  <IconButton aria-label={""} icon={<IoSearch />} colorScheme="blue" size={"sm"} onClick={handlePesquisaProtocolo}/>
                  </Flex>
                </Box>
                <Button>Confirmar Pagamento</Button>
              </Flex>
            </Flex>
          </Box>
        </>
      ) : null}
    </>
  );
}
