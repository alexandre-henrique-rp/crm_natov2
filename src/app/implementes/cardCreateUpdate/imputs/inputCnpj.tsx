"use client";

import { FinanceiraContext } from "@/context/FinanceiraContext";
import { Box, Input, InputProps } from "@chakra-ui/react";
import React, { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { mask, unMask } from "remask";

export interface InputCnpjProps extends InputProps {
  setValueCnpj?: string;
}

type InputCnpjType = {
  CnpjContex: string;
  setCnpjContex: React.Dispatch<React.SetStateAction<string>>;
};

export const InputCnpjContext = createContext<InputCnpjType>({
  CnpjContex: "",
  setCnpjContex: () => {},
});

/**
 * Input que aceita CNPJ, aplica a máscara automaticamente e retorna o valor sem máscara.
 *
 * @param setValueCnpj - valor do CNPJ sem máscara
 * @param props - props do Input do Chakra
 *
 * @returns componente Input com a máscara de CNPJ
 *
 */
export default function InputCnpj({ setValueCnpj, ...props }: InputCnpjProps) {
  const { cnpj, setCnpj } = useContext(FinanceiraContext);

  //   const [cnpj, setCnpj] = useState<string>("");
  const [Mask, setMask] = useState<string>("");

  useEffect(() => {
    if (!setValueCnpj) return;
    const valorLimpo = unMask(setValueCnpj);
    const maskCpf = mask(valorLimpo, ["99.999.999/9999-99"]);
    setMask(maskCpf);
    setCnpj(valorLimpo);
  }, [setValueCnpj]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const valorLimpo = unMask(valor);
    const maskCpf = mask(valorLimpo, ["99.999.999/9999-99"]);
    setMask(maskCpf);
    setCnpj(valorLimpo);
    props.onChange && props.onChange(e); // Mantém o evento original se passado
  };

  return (
    <>
      {setValueCnpj && (
        <Input
          {...props}
          value={Mask}
          type="text"
          color={"teal.500"}
          _hover={{ color: "teal.500" }}
          _focus={{ color: "teal.500", borderColor: "teal.500" }}
          maxLength={18}
        />
      )}
      {!setValueCnpj && (
        <Input {...props} value={Mask} type="text" onChange={handleChange}  maxLength={18}/>
      )}
      <Box hidden>
        <Input value={cnpj} type="text" name="cnpj" hidden />
      </Box>
    </>
  );
}
