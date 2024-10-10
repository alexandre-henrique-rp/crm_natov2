"use client";
import { TelefoneMaskFunction } from "@/functions/mask_tel";
import { Input, InputProps } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { ConstrutoraContext } from "@/context/ConstrutoraContex";

// Definindo o tipo para SetValue, ajuste conforme necessário para o tipo correto da sua aplicação
interface InputConstrutoraTellProps extends InputProps {
  Index?: number|any;
  tell?: string;
}

export const InputConstrutoraTell = ({ Index,tell, ...props }: InputConstrutoraTellProps) => {

  const { data} = useContext(ConstrutoraContext);
  const [telLocal, setTelLocal] = useState<string>("");


  useEffect(() => {
    if(data){
      setTelLocal(data.telefone);
    }
    if (tell) {
      const MaskTel = TelefoneMaskFunction(tell);
      setTelLocal(MaskTel);
    }
  }, [tell, data]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const value = e.target.value;
      const valorLimpo = value.replace(/[^0-9]/g, "");
      const MaskTel = TelefoneMaskFunction(valorLimpo);
      setTelLocal(MaskTel);
    }
  };
  return (
    <>
        <Input
          type="text"
          value={telLocal}
          onChange={handleChange}
          placeholder="(__) _____-____"
          name={Index > 0 ?`telefone ${Index}`: "telefone"}
          variant="flushed"
          {...props}
        />
         <Input hidden
          type="text"
          value={tell}
          name={'telefoneSemMask'}
          variant="flushed"
          {...props}
        />

    </>
  );
};
