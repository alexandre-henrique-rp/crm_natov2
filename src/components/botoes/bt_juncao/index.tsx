"use client";
import {
  Box,
  Flex,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
  import { useSession } from "@/hook/useSession";
import { HamburgerIcon } from "@chakra-ui/icons";
import BotaoMenu from "../bt_menu";
import BotaoMobileMenu from "../bt_mobile_menu";
import { useEffect, useState } from "react";

export default function BotaoJuncao() {
  const [admin, setAdmin] = useState(false);
  const session = useSession();
  console.log("🚀 ~ BotaoJuncao ~ but:", session?.hierarquia)
  useEffect(() => {
   if (session) {
    if (session?.hierarquia === "ADM") {
    setAdmin(true);
    }
    if (session?.hierarquia === "GRT") {
    setAdmin(true);
    }
   }
  }, [session]);

  return (
    <Flex
      justifyContent={"space-between"}
      py={3}
      w={"100%"}
      bg={"#00713D"}
      px={40}
    >
      <Flex gap={10} alignItems={"center"}>
        <Box minW={"100px"} w={"112px"}>
          <Img src="/SisnatoLogoL.png" alt="Logo" width={"100%"}  />
        </Box>
        <Box display={{ base: "flex", md: "none" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <BotaoMobileMenu name="Home" />
              <BotaoMobileMenu name="Nova Solicitação" />
              {admin && <BotaoMobileMenu name="Painel adm" />}
              <BotaoMobileMenu name="Dashboard" />
              <BotaoMobileMenu name="FAQ" />
              <BotaoMobileMenu name="Sair" />
            </MenuList>
          </Menu>
        </Box>

        <Box display={{ base: "none", md: "flex" }} gap={1} w={"85%"}>
          <BotaoMenu name="Home" />
          <BotaoMenu name="Nova Solicitação" />
          {admin && <BotaoMenu name="Painel adm" />}
          <BotaoMenu name="Dashboard" />
          <BotaoMenu name="FAQ" />
          <BotaoMenu name="Direto" />
        </Box>
      </Flex>

      <Box display={{ base: "none", md: "flex" }}>
        <BotaoMenu name="Sair" />
      </Box>
    </Flex>
  );
}
