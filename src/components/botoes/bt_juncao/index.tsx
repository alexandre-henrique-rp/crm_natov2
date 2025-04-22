"use client";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Img,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
} from "@chakra-ui/react";
import BotaoSair from "../bt_sair";
import { useSession } from "next-auth/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { HiOutlineLogout } from "react-icons/hi";
import BotaoMenu from "../bt_menu";
import BotaoMobileMenu from "../bt_mobile_menu";

export default function BotaoJuncao() {
  const { data: session } = useSession();
  const but = session?.user?.hierarquia;

  return (
    <Flex
      h={"12vh"}
      justifyContent={"space-between"}
      py={3}
      w={"100%"}
      bg={"#00713D"}
      px={20}
    >
      <Flex gap={1} w={"60%"}>
        <Box w={"15%"}>
          <Img src="/logo.png" alt="Logo" />
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
              {but === "ADM" && <BotaoMobileMenu name="Painel adm" />}
              <BotaoMobileMenu name="Dashboard" />
              <BotaoMobileMenu name="FAQ" />
              <BotaoMobileMenu name="Sair" />
            </MenuList>
          </Menu>
        </Box>

        <Box display={{ base: "none", md: "flex" }} gap={1} w={"85%"}>
          <BotaoMenu name="Home" />
          <BotaoMenu name="Nova Solicitação" />
          {but === "ADM" && <BotaoMenu name="Painel adm" />}
          <BotaoMenu name="Dashboard" />
          <BotaoMenu name="FAQ" />
        </Box>
      </Flex>

      <Box display={{ base: "none", md: "flex" }}>
        <BotaoMenu name="Sair" />
      </Box>
    </Flex>
  );
}
