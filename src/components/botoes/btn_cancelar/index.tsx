"use client";

import { Button, ButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

// Agora BotaoCancelar aceita todas as props do Chakra Button normalmente
export default function BotaoCancelar(props: ButtonProps) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      {...props}
    >
      Cancelar
    </Button>
  );
}
