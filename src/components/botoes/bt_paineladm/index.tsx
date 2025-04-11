"use client";
import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiSettings } from "react-icons/fi";

export default function BotaoPainelAdm({ renderAsText = false }) {
  const router = useRouter();

  if (renderAsText) {
    return (
      <Text
        color="white"
        fontSize="sm"
        cursor="pointer"
        display="flex"
        fontWeight={'light'}
        alignItems="center"
        onClick={() => router.push("/adm")}
      >
        <FiSettings style={{ marginRight: '8px' }} />
        PAINEL ADM
      </Text>
    );
  }

  return (
    <Button
      textColor={"white"}
      variant="link"
      size="md"
      fontWeight={'light'}
      leftIcon={<FiSettings />}
      onClick={() => router.push("/adm")}
    >
      PAINEL ADM
    </Button>
  );
}
