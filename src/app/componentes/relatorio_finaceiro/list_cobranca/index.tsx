"use client";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  useToast
} from "@chakra-ui/react";
import { use} from "react";
import { useSession } from "next-auth/react";
import { GetPgEmAberto } from "@/actions/relatorio_financeiro/service/GetPgAberto";

export default function ListCobranca() {
  const { data: session } = useSession();
  const Data = use(GetPgEmAberto())

  const lista = Data.data && Data.data.map((item: any) => {
    return (
      <>
        <Flex>
          <Text>{item.id} - {item.protocolo} - {item.createdAt.split('T')[0].split('-').reverse().join('/')}{item.construtora?.fantasia && ` - ${item.construtora?.fantasia}`}</Text>
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
          <Box w={"34%"} h={"47vh"} p={5} rounded="lg" boxShadow="2xl">
            <Box w={"100%"} textAlign={"center"}>
              <Heading size="md">Lista de Cobranças em Aberto</Heading>
            </Box>
            {Data.data ? lista : null}
          </Box>
        </>
      ) : null}
    </>
  );
}
