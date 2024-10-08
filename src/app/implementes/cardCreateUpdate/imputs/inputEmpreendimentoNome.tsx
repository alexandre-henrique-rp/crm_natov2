"use client";
import useEmpreendimentoContext from "@/hook/useEmpreendimentoContext";
import { Box, Input, InputProps } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";

export interface InputEmpreendimentoNomeProps extends InputProps {
  setNomeValue?: string;
}
export default function InputEmpreendimentoNome({ setNomeValue, ...props }: InputEmpreendimentoNomeProps) {
    
    const [nomeLocal, setNomeLocal] = useState<string>("");
    const { construtoraTag } = useEmpreendimentoContext()


  useEffect(() => {
    if(construtoraTag){
        setNomeLocal(`${construtoraTag} - `)
    }
    if (!setNomeValue) return;
    const removeCaracteresEspeciais = setNomeValue.replace(/[^a-zA-Z\s\.,\/\\:;!?'"()-]/g, "");
    const Linite1EspacoEntre = removeCaracteresEspeciais.replace(/\s+/g, " ");
    const RemosEspacosExtras = Linite1EspacoEntre.trim();
    setNomeLocal(RemosEspacosExtras);
  }, [setNomeValue, construtoraTag]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const removeCaracteresEspeciais = valor.replace(/[^a-zA-Z\s\.,\/\\:;!?'"()-]/g, "");
    const Linite1EspacoEntre = removeCaracteresEspeciais.replace(/\s+/g, " ");
    const RemosEspacosExtras = Linite1EspacoEntre;
    setNomeLocal(RemosEspacosExtras);
    props.onChange && props.onChange(e);
  };

  return (
    <>
        <Box>
          <Input {...props} value={nomeLocal} type="text" onChange={handleChange} />
        </Box>
    </>
  );
}
