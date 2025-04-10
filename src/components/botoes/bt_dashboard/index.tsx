"use client";

import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";
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
        alignItems="center"
        onClick={handleClick}
      >
        <MdDashboard style={{ marginRight: '8px' }} />
        DASHBOARD
      </Text>
    );
  }

  return (
    <Button
      textColor={"white"}
      variant="link"
      size="sm"
      leftIcon={<MdDashboard />}
      onClick={handleClick}
    >
        DASHBOARD
    </Button>
  );
}
