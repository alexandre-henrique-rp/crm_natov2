"use client";
import { DesativarEmpreendimento } from "@/actions/empreendimento/service/desativarEmpreendimento";
import { Button, Tooltip, useToast, Icon } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GrStatusCritical, GrStatusGood } from "react-icons/gr"; 

interface BtnDesativarEmpreendimentoProps {
  id: string;
  ativo: boolean;
}

export function BtnDesativarEmpreendimento({ id, ativo }: BtnDesativarEmpreendimentoProps) {
  console.log("🚀 ~ BtnExcluirEmpreendimento ~ ativo:", ativo)
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggleStatus = async () => {
    setIsLoading(true);
    try {
      const data = await DesativarEmpreendimento(id); 
  

      if (data && data.error === false) {
        toast({
          title: "Sucesso!",
          description: ativo
            ? "Empreendimento Desativado com sucesso!"
            : "Empreendimento Ativado com sucesso!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.refresh();
      } else {
        toast({
          title: "Erro!",
          description: "Ocorreu um erro ao alterar o status do Empreendimento",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Erro na operação de desativação:", error);
      toast({
        title: "Erro!",
        description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Tooltip
      label={ativo ? "Desativar Empreendimento" : "Ativar Empreendimento"}
    >
      <Button
        colorScheme={ativo ? "green" : "red"}
        variant="outline"
        onClick={handleToggleStatus}
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        <Icon as={ativo ? GrStatusGood : GrStatusCritical} color={ativo ? "green.500" : "red.500"} mr={2} />
        {ativo ? "Ativado" : "Desativado"} 
      </Button>
    </Tooltip>
  );
}
