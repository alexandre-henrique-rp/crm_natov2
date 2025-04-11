"use client";

import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
export default function BotaoDashboard({ renderAsText = false }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
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
        <LuLayoutDashboard style={{ marginRight: '8px' }} />
        DASHBOARD
      </Text>
    );
  }

  return (
    <Button
      textColor={"white"}
      variant="link"
      size="md"
      fontWeight={'light'}
      leftIcon={<LuLayoutDashboard />}
      onClick={handleClick}
    >
        DASHBOARD
    </Button>
  );
}
