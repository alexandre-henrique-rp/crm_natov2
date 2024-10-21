"use client";
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  useMediaQuery
} from "@chakra-ui/react";
import BotaoNovaSolicita from "../bt_nvsolicita";
import BotaoSair from "../bt_sair";
import { useSession } from "next-auth/react";
import {  IoMenuOutline } from "react-icons/io5";
import BotaoPainelAdm from "../bt_paineladm";
import BotaoUser from "../bt_user";
import BotaoHome from "../bt_home";

export default function BotaoJuncao() {
  const { data: session } = useSession();
  const but = session?.user?.hierarquia;
  const [isLargerThanTablet] = useMediaQuery("(min-width: 500px)");

  return (
    <Flex
      pt={"20px"}
      pb={"20px"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      w={"100%"}
      h={"5vh"}
      bg={"#00713D"}
      px={"11rem"}
    >
      <Box
        display={"flex"}
        gap={"20px"}
        w={"100%"}
      >
        {isLargerThanTablet ? (
          <>
            <BotaoHome />
            <BotaoNovaSolicita />
            {but === "ADM" && (
              <>
                <BotaoPainelAdm />
                {/* <BotaoPainelFinanceiro /> */}
              </>
            )}
            {but === "CONST" && (
              <>
                <BotaoPainelAdm />
                {/* <BotaoPainelFinanceiro /> */}
              </>
            )}
          </>
        ) : (
          <Menu>
            <IconButton
              icon={<IoMenuOutline />}
              size="2xl"
              variant="outline"
              border={'none'}
              color={"white"}
              aria-label={""}
            />
            <MenuList bg={"#05927b"}>
              <MenuItem bg={"transparent"}>
                <BotaoNovaSolicita />
              </MenuItem>
              {but === "ADM" && (
                <>
                  <MenuItem bg={"transparent"}>
                    <BotaoPainelAdm />
                  </MenuItem>
                </>
              )}
              {but === "CONST" && (
                <>
                  <MenuItem bg={"transparent"}>
                    <BotaoPainelAdm />
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        )}
      </Box>
      <Box display={"flex"}>
        {but === "ADM" && <BotaoUser />}
        <BotaoSair />
      </Box>
    </Flex>
  );
}
