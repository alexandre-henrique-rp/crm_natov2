"use client";

import { DesativarEmpreendimento } from "@/actions/empreendimento/service/desativarEmpreendimento";
import {
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BsFillTrashFill } from "react-icons/bs";


interface BtnDesativarEmpreendimentoProps {
  id: string;
}

export function BtnDesativarEmpreendimento2({ id }: BtnDesativarEmpreendimentoProps) {
  const toast = useToast();
  const router = useRouter();

  const handleExcluir = async () => {
    
    const data = await DesativarEmpreendimento(id);

    if (data.error === false) {
      toast({
        title: "Sucesso!",
        description: "Financeira excluída com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.refresh();
    } else {
      toast({
        title: "Erro!",
        description: "Ocorreu um erro ao excluir a Financeira!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Tooltip label="Excluir Financeira">
        <IconButton
          colorScheme="red"
          variant="outline"
          icon={<BsFillTrashFill />}
          aria-label="Delete"
          onClick={handleExcluir}
        />
      </Tooltip>
    </>
  );
}
