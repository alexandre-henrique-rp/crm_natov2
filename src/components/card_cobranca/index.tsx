"use client";
import { Button, Flex, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { BotaoSaveNota } from "../botoes/btn_save_nota";
import { useState } from "react";
import { useRouter } from "next/navigation";


interface CardCobrancaProps {
  data: any;
}

export const CardCobranca = ({ data }: CardCobrancaProps) => {
  const [N_nota, setN_nota] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  const Spiner = () => {
    return (
      <Flex w={"100%"} justifyContent={"center"} alignItems={"center"}>
        <Spinner
          thickness="8px"
          h={"6.3rem"}
          w={"6.3rem"}
          speed="0.75s"
          color="blue.500"
          fontSize={"4xl"}
          emptyColor="gray.200"
        />
      </Flex>
    );
  };
  console.log(data);

  async function ConfirmePg(id: number) {
    setLoading(true);
    const request = {data: {solicitacao: id}}; 
    const totalArray = request.data;
;
    const Atualizar = {error: false, message: "Pagamento confirmado com sucesso!"};
    if (Atualizar.error) {
      toast({
        title: "Erro",
        description: Atualizar.message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
    if (!Atualizar.error) {
      toast({
        title: "Sucesso",
        description: Atualizar.message,
        status: "success",
        duration: 3000,
        isClosable: true
      });
      router.refresh();
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Spiner />}
      {!loading && (
        <>
          <Text> Id: {data.id}</Text>
          <Text>Protocolo: {data.protocolo}</Text>
          <Text>
            Expedido em:{" "}
            {data.createdAt.split("T")[0].split("-").reverse().join("/")}
          </Text>
          {data.construtora?.fantasia && (
            <>
              <Text> Construtora: {data.construtora?.fantasia}</Text>
            </>
          )}
          {data.nota_fiscal ? (
            <>
              <Text>Nota Fiscal Nº: {data.nota_fiscal},</Text>
            </>
          ) : (
            <Flex gap={2}>
              <Text>Nº Fiscal:</Text>
              <Input
                type="number"
                size={"xs"}
                w={"100px"}
                onChange={(e) => setN_nota(e.target.value)}
              />
              <BotaoSaveNota id={data.id} N_nota={N_nota} />
            </Flex>
          )}
          <Button size={"xs"} colorScheme="blue">
            Gerar Nota
          </Button>
          <Button
            size={"xs"}
            colorScheme="cyan"
            onClick={() => ConfirmePg(data.id)}
            disabled={!data.statusNota}
          >
            Confirmar Pagamento
          </Button>
        </>
      )}
    </>
  );
};
