import { Box, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"


// Recebe setValue via props
interface InputConfirSenhaProps {
  setValue: (value: string) => void;
}

export function InputConfirSenha({ setValue }: InputConfirSenhaProps) {
  const [show, setShow] = useState(false);
  const [confirSenha, setSenha] = useState("");

  const handleClick = () => setShow(!show);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSenha(value);
    setValue(value);       
  };

  return (
    <>
    <InputGroup size="md">
      <Input
        name="confirsenha"
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Confirme sua senha"
        value={confirSenha}
        onChange={handleChange}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? <FaEyeSlash/> : <FaEye/> }
        </Button>
      </InputRightElement>
    </InputGroup>
    </>
  );
}
