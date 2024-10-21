"use client";
import { Box, Input, InputProps, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { mask } from "remask";

// Definindo o tipo para SetValue, ajuste conforme necessário para o tipo correto da sua aplicação
interface InputTel1Props extends InputProps {
  Index?: number | any;
  tell?: string;
}

export const InputRegisterTel = ({ Index, tell, ...props }: InputTel1Props) => {
  const [tel1, setTel1] = useState<string>("");
  const [Teste, setTeste] = useState<number>(0);
  const [Error, setError] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (tell) {
      const MaskTel = mask(tell, ["(99) 9 9999-9999", "(99) 9999-9999"]);
      setTel1(MaskTel);
    }
  }, [tell]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const value = e.target.value;
      const valorLimpo = value.replace(/[^0-9]/g, "");
      const MaskTel = mask(valorLimpo, ["(99) 9 9999-9999", "(99) 9999-9999"]);
      setTel1(MaskTel);
    }
  };

  const CheckWhatsApp = async (numero: string) => {
    const request = await fetch("/api/verificador/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        telefone: numero
      })
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
          value={tel1}
          onChange={handleChange}
          onBlur={HandleChekTel}
          placeholder="(__) _____-____"
          name={Index > 0 ? `telefone ${Index}` : "telefone"}
          variant="flushed"
          {...props}
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
          name={Index > 0 ? `whatsapp ${Index}` : "whatsapp"}
          readOnly
        />
      </Box>
    </>
  );
};
