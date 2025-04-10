"use client";
import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { AiFillProduct } from "react-icons/ai";

export default function BotaoPainelAdm({ renderAsText = false }) {
  const router = useRouter();

  if (renderAsText) {
    return (
      <Text
        color="white"
        fontSize="sm"
        cursor="pointer"
        display="flex"
        alignItems="center"
        onClick={() => router.push("/adm")}
      >
        <AiFillProduct style={{ marginRight: '8px' }} />
        PAINEL ADM
      </Text>
    );
  }

  return (
    <Button
      textColor={"white"}
      variant="link"
      size="sm"
      leftIcon={<AiFillProduct />}
      onClick={() => router.push("/adm")}
    >
      PAINEL ADM
    </Button>
  );
}
