import CreateAlertGeral from "@/app/componentes/bt_creat_Alert_geral";
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PAINEL ADMINISTRATIVO"
};



export default function PainelAdministrativo() {
  return (
    <>
      <Flex
        w={"100%"}
        minH={"90.9dvh"}
        px={{ base: 2, md: "10rem" }}
        py={5}
        flexDir={"column"}
      >
        <Flex w={"100%"} justifyContent={"space-around"}>
          <Heading>Painel Administrativo</Heading>
          <Flex gap={2} alignItems="center">
          <CreateAlertGeral />
            <Link
              py={1}
              px={5}
              border="none"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500", textDecoration: "none" }}
              boxShadow={"lg"}
              cursor={"pointer"}
              href={"/usuarios"}
              fontSize={"0.8rem"}
            >
              Usuario
            </Link>
            <Link
              py={1}
              px={5}
              border="none"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500", textDecoration: "none" }}
              boxShadow={"lg"}
              cursor={"pointer"}
              href={"/construtora"}
              fontSize={"0.8rem"}
            >
              construtora
            </Link>
            <Link
              py={1}
              px={5}
              border="none"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500", textDecoration: "none" }}
              boxShadow={"lg"}
              cursor={"pointer"}
              href={"/empreendimentos"}
              fontSize={"0.8rem"}
            >
              Empreendimentos
            </Link>
            <Link
              py={1}
              px={5}
              border="none"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500", textDecoration: "none" }}
              boxShadow={"lg"}
              cursor={"pointer"}
              href={"/financeiras"}
              fontSize={"0.8rem"}
            >
              financeiras
            </Link>
          </Flex>
        </Flex>
        <Divider my={5} />
        
      </Flex>
    </>
  );

  // return (
  //   <Flex
  //     flexDir="column"
  //     h="100%"
  //     background="#F8F8F8"
  //     overflowY={"auto"}
  //     alignItems="center"
  //     py={10}
  //     px={4}
  //   >
  //     <Box
  //       border="3px solid #E8E8E8"
  //       borderRadius="8px"
  //       p={8}
  //       w={useBreakpointValue({ base: "100%", md: "80%", lg: "60em" })}
  //       textAlign="center"
  //       flexDir="column"
  //       alignItems="center"
  //       mb={8}
  //     >
  //       <Flex mb={8} justifyContent="center" alignItems="center">
  //         <Box zIndex={1} position="initial">
  //           <BotaoRetorno rota="/" />
  //         </Box>
  //         <Box ml={4}>
  //           <Text fontSize="32px" fontWeight="bold" color="#333333">
  //             PAINEL ADMINISTRATIVO
  //           </Text>
  //         </Box>
  //       </Flex>

  //       {!isMobile ? (
  //         <Box>
  //           <Flex justifyContent={"space-between"} gap={10} p={5}>
  //             <BotaoCadastro />
  //             <BotaoCadastroemp />
  //             <BotaoCadastroconst />
  //           </Flex>
  //         </Box>
  //       ) : (
  //         <Menu>
  //           <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
  //             Menu
  //           </MenuButton>
  //           <MenuList>
  //             <MenuItem>
  //               <BotaoCadastro />
  //             </MenuItem>
  //             <MenuItem>
  //               <BotaoCadastroemp />
  //             </MenuItem>
  //             <MenuItem>
  //               <BotaoCadastroconst />
  //             </MenuItem>
  //           </MenuList>
  //         </Menu>
  //       )}
  //     </Box>

  //     <Box
  //       border="3px solid #E8E8E8"
  //       borderRadius="8px"
  //       p={8}
  //       w={useBreakpointValue({ base: "100%", md: "80%", lg: "60em" })}
  //       textAlign="center"
  //       display={{ base: "block", md: "flex" }} // Mudança de 'none' para 'block' para garantir que o componente seja exibido em telas menores
  //       flexDir="column"
  //       alignItems="center"
  //       mt={8}
  //     >
  //       <Aprovacao />
  //     </Box>
  //   </Flex>
  // );
}


async function Processos(){
  
}