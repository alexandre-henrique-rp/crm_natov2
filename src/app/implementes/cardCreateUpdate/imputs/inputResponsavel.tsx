"use client";
import { FinanceiraContext } from "@/context/FinanceiraContext";
import { Box, Input, InputProps } from "@chakra-ui/react";
import React from "react";
import { useContext, useEffect } from "react";

export interface InputResponsavelProps extends InputProps {
    setValueResponsavel?: string;
}
export default function InputResponsavel({ setValueResponsavel, ...props }: InputResponsavelProps) {
    
    const { responsavel, setResponsavel } = useContext(FinanceiraContext);


  useEffect(() => {
    if (!setValueResponsavel) return;
    const ValorSemAcentos = setValueResponsavel.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const removeCaracteresEspeciais = ValorSemAcentos.replace(/[^a-zA-Z\s]/g, "");
    const Linite1EspacoEntre = removeCaracteresEspeciais.replace(/\s+/g, " ");
    const RemosEspacosExtras = Linite1EspacoEntre.trim();
    const UpCase = RemosEspacosExtras.toUpperCase();
    setResponsavel(UpCase);
  }, [setValueResponsavel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const ValorSemAcentos = valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const removeCaracteresEspeciais = ValorSemAcentos.replace(/[^a-zA-Z\s]/g, "");
    const Linite1EspacoEntre = removeCaracteresEspeciais.replace(/\s+/g, " ");
    const RemosEspacosExtras = Linite1EspacoEntre;
    const UpCase = RemosEspacosExtras.toUpperCase();
    setResponsavel(UpCase);
    props.onChange && props.onChange(e); // Mantém o evento original se passado
  };

  return (
    <>
        <Box>
          <Input {...props} value={responsavel ?? ''} type="text" onChange={handleChange} />
        </Box>
    </>
  );
}
