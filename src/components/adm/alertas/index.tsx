import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface AlertasProps {
  id: number;
  titulo: string;
  solicitacao_id: number;
  corretor: number;
  tag: string;
  empreendimento: number;
  status: boolean;
  createdAt?: string;
  updatedAt: string;
  descricao: string;
}

export default function Alertas() {
  const [alertas, setAlertas] = useState<AlertasProps[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchAlertas();
  }, []);

  const fetchAlertas = async () => {
    try {
      const req = await fetch("/api/alerts/geral/findAll");
      const data = await req.json();
      setAlertas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleDelete = async (id: number) => {
    try {
      const req = await fetch(`/api/alerts/geral/delete/${id}`, {
        method: "DELETE",
      });
      const data = await req.json();
      if (!req.ok) {
        throw new Error(data.message);
      }
      toast({
        title: "Alerta removido com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAlertas();
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Erro ao remover alerta",
        status: error.message,
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box
        bg="white"
        borderRadius="lg"
        p={{ base: 3, md: 6 }}
        boxShadow="md"
        w="100%"
      >
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
          Alertas Gerais
        </Text>
        <Divider borderColor="gray.300" my={2} />
        <Flex h={"19.5rem"} overflowY="auto" flexDirection="column" gap={3}>
          {alertas.map((alerta: AlertasProps) => (
            <Card
              direction="row"
              key={alerta.id}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="xl"
              boxShadow="lg"
              p={2}
              alignItems="center"
            >
              <CardHeader>
                <Heading size="md">{alerta.tag}</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  {alerta.titulo} -{" "}
                  {alerta.createdAt && alerta.createdAt.split("T")[0].split("-").reverse().join("/")}
                  {" "}
                  {alerta.updatedAt && alerta.updatedAt.split("T")[1].split(".")[0]}
                </Text>
              </CardBody>
              <CardFooter>
                <Button
                  colorScheme="red"
                  size="xs"
                  onClick={() => HandleDelete(alerta.id)}
                >
                  Remover
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Flex>
      </Box>
    </>
  );
}
