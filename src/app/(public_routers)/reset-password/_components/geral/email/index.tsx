"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { VerifyEmailComponent } from "../../VerifyEmail";
import Loading from "@/app/loading";
import { useState } from "react";

export const GeralVerifyEmailProps = () => {
  const [Load, setLoad] = useState<boolean>(false);

  const detectLoad = (e: any) => {
    if (e == 1) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  };

  if (Load) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <Flex
      w={"100%"}
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex
        shadow={"2xl"}
        borderRadius={"15px"}
        maxWidth={"600px"}
        width={"90%"}
        p={"25px"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box w={"100%"}>
          <Text
            fontSize={"25px"}
            textAlign={"center"}
            color="#00713D"
            fontWeight={"bold"}
          >
            CONFIRME SEU EMAIL
          </Text>
        </Box>

        <Box w={"100%"} mt={4}>
          <Text
            fontSize={"14px"}
            textAlign={"center"}
            color="#00713D"
            fontWeight={"bold"}
          >
            Por favor, insira seu endereço de email cadastrado abaixo para
            redefinir sua senha.
          </Text>
        </Box>

        <Box w={"100%"} mt={4}>
          <VerifyEmailComponent reload={detectLoad} />
        </Box>
      </Flex>
    </Flex>
  );
};
