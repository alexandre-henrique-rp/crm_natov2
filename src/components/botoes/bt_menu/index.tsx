"use client";

import { IconsMenu } from "@/data/icons/menu";
import { Button } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

type BotaoMenuProps = {
  name:
    | "Home"
    | "Painel adm"
    | "Nova Solicitação"
    | "Dashboard"
    | "FAQ"
    | "Sair";
};

export default function BotaoMenu({ name }: BotaoMenuProps) {
  console.log("🚀 ~ BotaoMenu ~ name:", name)
  const router = useRouter();
  const PathName = usePathname();
  const obj = IconsMenu.find((icon) => icon.label === name);
  const isActive =
    PathName !== "/" && name !== "Home"
      ? PathName.includes(obj?.path || "")
      : false;
  return (
    <Button
      textColor={"white"}
      variant="link"
      size="md"
      fontWeight={"light"}
      leftIcon={obj?.icon}
      onClick={() => {
        if (name !== "Sair") {
          (async () => {
            await fetch("/api/auth/logout");
          })();
          router.push("/login");
        }
        router.push(obj?.path || "");
      }}
      isActive={isActive}
      px={3}
      _active={{ bg: "white", textColor: "green.500" }}
      _hover={{ bg: "whiteAlpha.800", textColor: "green" }}
    >
      {name.toUpperCase()}
    </Button>
  );
}
