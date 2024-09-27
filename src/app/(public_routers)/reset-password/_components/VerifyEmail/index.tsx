"use client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const VerifyEmailComponent = (Props: { reload: any }) => {
  const [Email, setEmail] = useState<string>("");
  const toast = useToast();
  const router = useRouter();

  const HandleVoltar = () => {
    Props.reload(true);
    router.push("/login");
  };

  const HandleEmail = async () => {
    Props.reload(true);
    console.log(Email);
    try {
      const res = await fetch(`/api/reset-password/email?email=${Email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.message === "Email encontrado") {
        toast({
          title: "Email verificado",
          description: "Favor verificar seu email",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/login");
      } else {
        toast({
          title: "Erro",
          description: "Verifique se o email informado esta correto",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        Props.reload(false);
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Email não encontrado",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      Props.reload(false);
    }
  };

  return (
    <>
      <FormControl>
        <FormLabel
          color={"#00713D"}
          fontFamily={"roboto"}
          fontSize={"25px"}
          pt={"3%"}
          pb={"3%"}
        ></FormLabel>
        <Input
          placeholder="INSIRA SEU ENDEREÇO DE EMAIL"
          size={"lg"}
          type="email"
          border={"1px solid #00713D"}
          textAlign={"center"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormHelperText
          textAlign={"center"}
          color={"#00713D"}
          mt={"2%"}
          fontSize={"15px"}
        >
          Certifique-se de inserir o mesmo endereço de email que você usou para
          se inscrever. Após inserir seu email e confirmar, você receberá um
          link de confirmação em sua caixa de entrada.
        </FormHelperText>
      </FormControl>
      <Flex mt={"35px"} justifyContent={"space-between"} w={"100%"}>
        <Button size={"lg"} colorScheme="gray" onClick={HandleVoltar}>
          Voltar
        </Button>
        <Button size={"lg"} colorScheme="green" onClick={HandleEmail}>
          Enviar
        </Button>
      </Flex>
    </>
  );
};
