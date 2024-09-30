'use client'
import React, { useState } from "react";
import { Box, BoxProps, FormLabel, Input } from "@chakra-ui/react";
import { InputSenha } from "../imputs/inputSenha";

interface CardGridUserSenhaProps extends BoxProps {
  UserSenha?: string;
}

export function CardGridUserSenha({
  UserSenha,
  ...props
}: CardGridUserSenhaProps) {
  const [Senha, setSenha] = useState(UserSenha || ""); 

  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md" m={0}>
          Senha
        </FormLabel>
        <InputSenha setValue={setSenha} /> 
      </Box>
    </>
  );
}
