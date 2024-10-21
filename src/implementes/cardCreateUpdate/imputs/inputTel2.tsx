"use client";
import { Box, Input, InputProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { mask } from "remask";

// Definindo o tipo para SetValue, ajuste conforme necessário para o tipo correto da sua aplicação
interface InputTel1Props extends InputProps {
  SetValue: string;
  index: number;
}

export const InputTel2 = ({ index, SetValue, ...props }: InputTel1Props) => {
  const [tel1, setTel1] = useState<string>("");

  useEffect(() => {
    if (SetValue && !tel1) {
      const maskTel = mask(SetValue, ["(99) 9 9999-9999", "(99) 9999-9999"]);
      setTel1(maskTel); // Atribuindo o valor inicial do telefone
    }
  }, [SetValue, tel1]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const value = e.target.value;
      const valorLimpo = value.replace(/[^0-9]/g, "");
      const MaskTel = mask(valorLimpo, ["(99) 9 9999-9999", "(99) 9999-9999"]);
      setTel1(MaskTel);
    }
  };

  return (
    <>
      <Input
        type="tel"
        placeholder="(__) _____-____"
        variant="flushed"
        value={tel1}
        onChange={handleChange}
        {...props} // Spread dos props adicionais do Chakra UI
      />

      <Box hidden>
        <Input
          type="tel"
          name={`telefones${index > 0 && index}`}
          value={tel1.replace(/\D+/g, "")}
          hidden
          readOnly
        />
      </Box>
    </>
  );
};
