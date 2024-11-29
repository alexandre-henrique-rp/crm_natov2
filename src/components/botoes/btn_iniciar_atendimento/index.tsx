'use client';

import { CancelarAtendimento } from "@/actions/solicitacao/service/cancelarAtendimento";
import { IniciarAtendimento } from "@/actions/solicitacao/service/iniciarAtendimento";
import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";


interface BtnIniciarAtendimentoProps {
  status: number;
  aprovacao: boolean;
  id: number;
}

export default function BtnIniciarAtendimento({
  status: initialStatus,
  aprovacao,
  id,
}: BtnIniciarAtendimentoProps) {
  const [status, setStatus] = useState(initialStatus);
  const toast = useToast();

  const handleIniciarAtendimento = async () => {
    const req = await IniciarAtendimento(id);
    if (req.error) {
      toast({
        title: req.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    toast({
      title: req.message,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });

    setStatus(1);
  };

  const handleCancelarAtendimento = async () => {
    const req = await CancelarAtendimento(id);
    if (req.error) {
      toast({
        title: req.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    toast({
      title: req.message,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });

    setStatus(0);
  };

  return (
    <>
      {(!aprovacao || status === 3) && (
        <>
          {status === 1 && (
            <Button size="sm" colorScheme="red" onClick={handleCancelarAtendimento}>
              Cancelar Atendimento
            </Button>
          )}
          {status === 0 && (
            <Button size="sm" colorScheme="teal" onClick={handleIniciarAtendimento}>
              Iniciar Atendimento
            </Button>
          )}
        </>
      )}
    </>
  );
}
