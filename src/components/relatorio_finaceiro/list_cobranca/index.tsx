"use client";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { GetPgEmAberto } from "@/actions/relatorio_financeiro/service/GetPgAberto";

export default function ListCobranca() {
  const { data: session } = useSession();
  const [Data, setData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const res = await GetPgEmAberto();
      setData(res);
    })();
  }, []);

  const lista =
    Data.data &&
    Data.data.map((item: any) => {
      return (
        <>
          <Flex
            w={"100%"}
            flexWrap={"wrap"}
            py={3}
            gap={4}
            px={2}
            border={"1px solid #000"}
            borderRadius={"8px"}
          >
            {/* <Text> id: {item.id}</Text> */}
            <Text>Protocolo: {item.protocolo}</Text>
            <Text>
              Expedido em:{" "}
              {item.createdAt.split("T")[0].split("-").reverse().join("/")}
            </Text>
            {item.construtora?.fantasia && (
              <>
                <Text> Construtora: {item.construtora?.fantasia}</Text>
              </>
            )}
          </Flex>
        </>
      );
    });

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
          <Box w={"full"} h={"25vh"} p={5} rounded="lg" boxShadow="2xl">
            <Box w={"100%"} textAlign={"center"}>
              <Heading size="md">Lista de Cobranças em Aberto</Heading>
            </Box>
            <Flex
              w={"100%"}
              h={"100%"}
              overflowY={"auto"}
              p={3}
              mt={2}
              gap={2}
              flexDir={"column"}
            >
              {Data.data ? lista : null}
            </Flex>
          </Box>
        </>
      ) : null}
    </>
  );
}
