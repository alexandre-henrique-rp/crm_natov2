"use client";
<<<<<<< Updated upstream
import { FinanceiraContext } from "@/context/FinanceiraContext";
import { Box, Input, InputProps } from "@chakra-ui/react";
import React, { useState } from "react";
import { useContext, useEffect } from "react";

export interface InputRazaoSocialProps extends InputProps {
  setValueRazaoSocial?: string;
}
export default function InputRazaoSocial({ setValueRazaoSocial, ...props }: InputRazaoSocialProps) {
    
    const { data } = useContext(FinanceiraContext);
    const [razaosocialLocal, setRazaosocialLocal] = useState<string>("");


  useEffect(() => {
    if(data){
      setRazaosocialLocal(data.razaosocial);
    }
    if (!setValueRazaoSocial) return;
    const ValorSemAcentos = setValueRazaoSocial.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const removeCaracteresEspeciais = ValorSemAcentos.replace(/[^a-zA-Z\s\.,\/\\:;!?'"()-]/g, "");
    const Linite1EspacoEntre = removeCaracteresEspeciais.replace(/\s+/g, " ");
    const RemosEspacosExtras = Linite1EspacoEntre.trim();
    const UpCase = RemosEspacosExtras.toUpperCase();
    setRazaosocialLocal(UpCase);
  }, [setValueRazaoSocial,data]);
=======

import { Box, Input, InputProps } from "@chakra-ui/react";
import React from "react";
import { createContext, useEffect, useState } from "react";

export interface InputRazaoSocialProps extends InputProps {
  setValue?: string;
}

type InputRazaoSocialType = {
  RazaoSocial: string;
  setRazaoSocialContex: React.Dispatch<React.SetStateAction<string>>;
};

export const InputRazaoSocialContext = createContext<InputRazaoSocialType>({
  RazaoSocial: "",
  setRazaoSocialContex: () => "",
});

export default function InputRazaoSocial({ setValue, ...props }: InputRazaoSocialProps) {
  const [RazaoSocial, setRazaoSocial] = useState<string>("");

  useEffect(() => {
    if (!setValue
    ) return;
    const ValorSemAcentos = setValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const removeCaracteresEspeciais = ValorSemAcentos.replace(/[^a-zA-Z\s]/g, "");
    const Linite1EspacoEntre = removeCaracteresEspeciais.replace(/\s+/g, " ");
    const RemosEspacosExtras = Linite1EspacoEntre.trim();
    const UpCase = RemosEspacosExtras.toUpperCase();
    setRazaoSocial(UpCase);
  }, [setValue]);
>>>>>>> Stashed changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const ValorSemAcentos = valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
<<<<<<< Updated upstream
    const removeCaracteresEspeciais = ValorSemAcentos.replace(/[^a-zA-Z\s\.,\/\\:;!?'"()-]/g, "");
    const Linite1EspacoEntre = removeCaracteresEspeciais.replace(/\s+/g, " ");
    const RemosEspacosExtras = Linite1EspacoEntre;
    const UpCase = RemosEspacosExtras.toUpperCase();
    setRazaosocialLocal(UpCase);
=======
    const removeCaracteresEspeciais = ValorSemAcentos.replace(/[^a-zA-Z\s]/g, "");
    const Linite1EspacoEntre = removeCaracteresEspeciais.replace(/\s+/g, " ");
    const RemosEspacosExtras = Linite1EspacoEntre;
    const UpCase = RemosEspacosExtras.toUpperCase();
    setRazaoSocial(UpCase);
>>>>>>> Stashed changes
    props.onChange && props.onChange(e);
  };

  return (
    <>
<<<<<<< Updated upstream
        <Box>
          <Input {...props} value={razaosocialLocal} type="text" onChange={handleChange} />
        </Box>
=======
      <InputRazaoSocialContext.Provider value={{ RazaoSocial: RazaoSocial, setRazaoSocialContex: setRazaoSocial }}>
        <Box>
          <Input {...props} value={RazaoSocial} type="text" onChange={handleChange} />
        </Box>
      </InputRazaoSocialContext.Provider>
>>>>>>> Stashed changes
    </>
  );
}
