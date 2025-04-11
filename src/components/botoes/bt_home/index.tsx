"use client";
import { Flex, Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiHome } from "react-icons/fi";

export default function BotaoHome() {
  const router = useRouter();

  return (
    <Flex>
      <Box
        h={"100%"}
        borderRadius={"15px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
      >
        <Button
          textColor={"white"}
          variant="link"
          size="md"
          fontWeight={'light'}
          leftIcon={<FiHome />}
          onClick={() => router.push("/")}
        >
          HOME
        </Button>
      </Box>
    </Flex>
  );
}
