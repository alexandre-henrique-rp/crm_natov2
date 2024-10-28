import FooterComponent from "@/components/footer";
import PublicHeader from "@/components/public_header";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";

export default function SuporteFaqHome() {
  return (
    <Flex
      minW="100vw"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      bg="gray.50"
      fontFamily={"Roboto, sans-serif"}
    >
      <PublicHeader />
      <Flex h="90vh" justifyContent={"center "} overflowY="auto" w="100%">
        <Flex alignItems="center" gap={6} w="90vw" flexDir="column" p={4}>
          <Box textAlign="center" p={6} borderRadius="md" mb={4}>
            <Text as="h1" fontSize="3xl" fontWeight="bold">
              Perguntas Frequentes
            </Text>
            <Text as="p" fontSize="lg" mt={2}>
              Nesta seção, apresentamos as perguntas mais frequentes
              relacionadas ao sisnato, visando esclarecer suas principais
              dúvidas.
            </Text>
          </Box>
          <Divider borderColor="gray.300" />
          <Box
            alignSelf={"flex-start"}
            textAlign="center"
            borderRadius="md"
            mb={4}
          >
            <Text as="h2" fontSize="2xl" fontWeight="bold">
              Dúvidas Frequentes:
            </Text>
          </Box>
          <Box
            borderWidth={1}
            borderColor="gray.300"
            borderRadius="xl"
            width="80vw"
            boxShadow="xl"
            bg="white"
            p={0}
            overflow={"hidden"}
          >
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton
                    border={"hidden"}
                    _expanded={{ color: "black" }}
                    _hover={{ bg: "green.400" }}
                  >
                    <Box
                      as="span"
                      fontSize={"2xl"}
                      flex="1"
                      textAlign="left"
                      p={2}
                    >
                      Senha de emissão, como recuperar?
                    </Box>
                    <AccordionIcon color={"blue.400"} />
                  </AccordionButton>
                </h2>

                <AccordionPanel pb={4}>
                  Caso você tenha sido atendido por videoconferência e tenha se
                  esquecido da senha de emissão, não há como recuperá-la. Neste
                  caso será necessário entrar em contato com nossa central de
                  atendimento e solicitar a revogação do certificado para a
                  emissão de um novo. Já se você tiver sido atendido
                  presencialmente, então você poderá solicitar uma cópia do
                  documento reservado onde constam os dados de emissão,
                  comparecendo na loja onde fez o certificado acompanhado do seu
                  documento de identificação com foto. Somente o titular pode
                  solicitar este documento.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton
                    border={"hidden"}
                    _expanded={{ bg: "green.200", color: "black" }}
                    _hover={{ bg: "green.100" }}
                  >
                    <Box
                      as="span"
                      fontSize={"2xl"}
                      flex="1"
                      textAlign="left"
                      p={2}
                    >
                      Sincronização de senha, como fazer?
                    </Box>
                    <AccordionIcon color={"blue.400"} />
                  </AccordionButton>
                </h2>

                <AccordionPanel pb={4}>
                  É possível sincronizar o novo celular com o Bird iD.Você deve:
                  <br />
                  <br />
                  <Box paddingLeft={10}>
                  <ol>
                    <li >
                      Baixar o app Bird ID no novo dispositivo;
                    </li>
                    <li>
                      Abrir o aplicativo;
                    </li>
                    <li>
                    Criar a senha de acesso ao aplicativo;
                    </li>
                    <li>
                   Acesso o menu lateral;
                    </li>
                    <li>
                    Clique na opção “Sincronizar dispositivo”;
                    </li>
                    <li>
                    Digite seu CPF e a senha do Portal Bird Id. 
                    </li>
                  </ol>
                  </Box>
                  <br />
                  E pronto! Seu Bird ID estará pronto
                  para utilização em seu novo celular.

                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Flex>
      </Flex>
      <FooterComponent />
    </Flex>
  );
}
