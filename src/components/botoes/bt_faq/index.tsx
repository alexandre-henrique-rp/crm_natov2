"use client";

import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaRegQuestionCircle } from "react-icons/fa";

export default function BotaoFaq({ renderAsText = false }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/suportefaq");
  };

  if (renderAsText) {
    return (
      <Text
        color="white"
        fontSize="sm"
        cursor="pointer"
        display="flex"
        fontWeight={'light'}
        alignItems="center"
        onClick={handleClick}
      >
        <FaRegQuestionCircle style={{ marginRight: "8px" }} />
        FAQ / Suporte
      </Text>
    );
  }

  return (
    <Button
      textColor={"white"}
      variant="link"
      size="md"
      fontWeight={'light'}
      leftIcon={<FaRegQuestionCircle />}
      onClick={handleClick}
    >
      FAQ / Suporte
    </Button>
  );
}
