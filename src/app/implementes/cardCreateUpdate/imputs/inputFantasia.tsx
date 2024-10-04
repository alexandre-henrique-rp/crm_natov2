"use client";
import { FinanceiraContext } from "@/context/FinanceiraContext";
import { Box, Input, InputProps } from "@chakra-ui/react";
import React from "react";
import { useContext, useEffect } from "react";

export interface InputFantasiaProps extends InputProps {
    setValueFantasia?: string;
}
export default function InputFantasia({ setValueFantasia, ...props }: InputFantasiaProps) {
    
    const { fantasia, setFantasia } = useContext(FinanceiraContext);
    


  useEffect(() => {
    if (!setValueFantasia) return;
    const ValorSemAcentos = setValueFantasia.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const removeCaracteresEspeciais = ValorSemAcentos.replace(/[^a-zA-Z\s]/g, "");
    const Linite1EspacoEntre = removeCaracteresEspeciais.replace(/\s+/g, " ");
    const RemosEspacosExtras = Linite1EspacoEntre.trim();
    const UpCase = RemosEspacosExtras.toUpperCase();
    setFantasia(UpCase);
  }, [setValueFantasia]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const ValorSemAcentos = valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const removeCaracteresEspeciais = ValorSemAcentos.replace(/[^a-zA-Z\s]/g, "");
    const Linite1EspacoEntre = removeCaracteresEspeciais.replace(/\s+/g, " ");
    const RemosEspacosExtras = Linite1EspacoEntre;
    const UpCase = RemosEspacosExtras.toUpperCase();
    setFantasia(UpCase);
    props.onChange && props.onChange(e); // Mantém o evento original se passado
  };

  return (
    <>
        <Box>
          <Input {...props} value={fantasia ?? ''} type="text" onChange={handleChange} />
        </Box>
    </>
  );
}
