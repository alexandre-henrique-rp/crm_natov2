"use client";

import { IconsMenu } from "@/data/icons/menu";
import { Button, IconButton } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [breakpoint, setBreakpoint] = useState("md");
  const router = useRouter();
  const PathName = usePathname();
  const obj = IconsMenu.find((icon) => icon.label === name);
  const isActive =
    PathName !== "/" && name !== "Home"
      ? PathName.includes(obj?.path || "")
      : false;

  const handleDirection = async () => {
    if (name === "Sair") {
      await fetch("/api/auth/logout");
      router.push("/login");
      return;
    }
    router.push(obj?.path || "");
  };
  const medidor = () => {
    const widthlevel = window.innerWidth < 1450 ? "sm" : "md";
    setBreakpoint(widthlevel);
  };

  useEffect(() => {
    window.addEventListener("resize", medidor);
    return () => {
      window.removeEventListener("resize", medidor);
    };
  }, []);
  return (
    <>
      {breakpoint === "sm" ? (
        <>
          <IconButton
            textColor={"white"}
            variant="link"
            size={{ sm: "xs", md: "md" }}
            aria-label={name}
            onClick={handleDirection}
            icon={obj?.icon}
            isActive={isActive}
            px={3}
            _active={{ bg: "white", textColor: "green.500" }}
            _hover={{ bg: "whiteAlpha.800", textColor: "green" }}
          />
        </>
      ) : (
        <>
          <Button
            textColor={"white"}
            variant="link"
            size={{ sm: "xs", md: "md" }}
            fontWeight={"light"}
            leftIcon={obj?.icon}
            onClick={handleDirection}
            isActive={isActive}
            px={3}
            _active={{ bg: "white", textColor: "green.500" }}
            _hover={{ bg: "whiteAlpha.800", textColor: "green" }}
          >
            {name.toUpperCase()}
          </Button>
        </>
      )}
    </>
  );
}
