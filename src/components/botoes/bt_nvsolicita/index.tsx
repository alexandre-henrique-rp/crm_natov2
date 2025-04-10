"use client";

import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { SiGoogleforms } from "react-icons/si";

export default function BotaoNovaSolicita({ renderAsText = false }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/solicitacoes");
  };

  if (renderAsText) {
    return (
      <Text
        color="white"
        fontSize="sm"
        cursor="pointer"
        display="flex"
        alignItems="center"
        onClick={handleClick}
      >
        <SiGoogleforms style={{ marginRight: '8px' }} />
        NOVA SOLICITAÇÃO
      </Text>
    );
  }

  return (
    <Button
      textColor={"white"}
      variant="link"
      size="sm"
      leftIcon={<SiGoogleforms />}
      onClick={handleClick}
    >
      NOVA SOLICITAÇÃO
    </Button>
  );
}
