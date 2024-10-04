"use client";
import { TelefoneMaskFunction } from "@/functions/mask_tel";
import { Box, Input, InputProps, Switch, Text } from "@chakra-ui/react";
import { use, useContext, useEffect, useState } from "react";
import { PropagateLoader, PulseLoader } from "react-spinners";
import { FinanceiraContext } from "@/context/FinanceiraContext";
import React from "react";


// Definindo o tipo para SetValue, ajuste conforme necessário para o tipo correto da sua aplicação
interface InputTelRazaoSocialProps extends InputProps {
  Index?: number|any;
  tell?: string;
}

export const InputTelRazaoSocial = ({ Index,tell, ...props }: InputTelRazaoSocialProps) => {

  const { tel, setTelefone} = useContext(FinanceiraContext);
  const [Teste, setTeste] = useState<number>(0);
  const [Error, setError] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (tell) {
      const MaskTel = TelefoneMaskFunction(tell);
      setTelefone(MaskTel);
    }
  }, [tell]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const value = e.target.value;
      const valorLimpo = value.replace(/[^0-9]/g, "");
      const MaskTel = TelefoneMaskFunction(valorLimpo);
      setTelefone(MaskTel);
    }
  };

  const CheckWhatsApp = async (numero: string) => {
    const request = await fetch("/api/verificador/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        telefone: numero,
      }),
    });
    const data = await request.json();

    if (data.exists) {
      return true;
    }
    return false;
  };

  const HandleChekTel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const value = e.target.value;
      const valorLimpo = value.replace(/[^0-9]/g, "");
      if (valorLimpo.length > 9) {
        setLoading(true);
        const request = await CheckWhatsApp(valorLimpo);
        if (request) {
          setTeste(1);
          setError(false);
          setLoading(false);
        } else {
          setTeste(0);
          setError(true);
          setLoading(false);
        }
      }
    }
  };

  return (
    <>
      {Loading && (
        <Box
          w={"100%"}
          pt={5}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <PulseLoader color="#68D391" />
        </Box>
      )}
      {!Loading && (
        <Input
          type="text"
          value={tell}
          onChange={handleChange}
        //   onBlur={HandleChekTel}
          placeholder="(__) _____-____"
          name={Index > 0 ?`telefone ${Index}`: "telefone"}
          variant="flushed"
          {...props} // Spread dos props adicionais do Chakra UI
        />
      )}
      {Error && (
        <Text color={"red"} fontSize="xs">
          Telefone não possui WhatsApp
        </Text>
      )}
      <Box hidden>
      <input 
        type="number"
        value={Teste}
        name={Index > 0 ?`whatsapp ${Index}`: "whatsapp"}
        />
      </Box>
    </>
  );
};
