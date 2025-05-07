/*
  File: src/components/PatchButton.tsx
  Client Component: sends given body via PATCH to /api/direto/patch
*/

"use client";

import React, { useState } from "react";
import { Button, ButtonProps, useToast } from "@chakra-ui/react";

interface PatchButtonProps extends Omit<ButtonProps, "onClick"> {
  /** JSON payload to be sent in the PATCH request */
  body: Record<string, any>;
  /** Optional callback for successful response */
  onSuccess?: (data: any) => void;
  /** Optional callback for error response */
  onError?: (error: any) => void;
}

export default function PatchButton({
  body,
  onSuccess,
  onError,
  children = "Salvar",
  ...buttonProps
}: PatchButtonProps) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = async () => {
    setLoading(true);
    try {
        const res = await fetch("/api/direto/patch", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
      const data = await res.json();
      if (!res.ok) throw data;

      toast({
        title: "Sucesso",
        description: "Operação concluída com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onSuccess?.(data);
    } catch (error) {
        console.log("🚀 ~ handleClick ~ body:", body);
      console.error("Erro no PATCH:", error);
      toast({
        title: "Erro",
        description: error?.message || "Falha ao realizar operação.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      isLoading={isLoading}
      loadingText="Enviando..."
      {...buttonProps}
    >
      {children}
    </Button>
  );
}
