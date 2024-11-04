/* eslint-disable react/no-unescaped-entities */
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
  Icon,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

export default function SuporteFaqHome() {
  return (
    <Flex
      minW="100vw"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      fontFamily="Roboto, sans-serif"
      bg="gray.50" // Fundo sutil
    >
      <PublicHeader />
      <Flex h="90vh" justifyContent="center" overflowY="auto" w="100%">
        <Flex
          alignItems="center"
          gap={6}
          w="90vw"
          flexDir="column"
          p={4}
          maxW="1200px"
        >
          <Box
            textAlign="center"
            p={6}
            borderRadius="lg"
            mb={4}
            bg="white"
            boxShadow="lg" // Sombra para destaque
          >
            <Text as="h1" fontSize="4xl" fontWeight="bold" color="#00713D">
              Perguntas Frequentes
            </Text>
            <Text as="p" fontSize="lg" mt={2} color="gray.600">
              Nesta seção, apresentamos as perguntas mais frequentes
              relacionadas ao sisnato, visando esclarecer suas principais
              dúvidas.
            </Text>
          </Box>

          <Divider borderColor="gray.300" />

          <Box
            alignSelf="flex-start"
            textAlign="center"
            borderRadius="md"
            mb={4}
          >
            <Text as="h2" fontSize="2xl" fontWeight="bold" color="#00713D">
              Dúvidas Frequentes:
            </Text>
          </Box>

          <Box
            borderWidth={1}
            borderColor="gray.300"
            borderRadius="xl"
            width="100%"
            maxW="800px"
            boxShadow="xl"
            bg="white"
            p={0}
            overflow="hidden"
          >
            <Accordion allowToggle>
              {[
                {
                  title: "Senha de emissão, como recuperar?",
                  content: (
                    <Text fontSize="lg" color="gray.700" mb={4}>
                      Caso você tenha sido atendido por videoconferência e tenha
                      se esquecido da senha de emissão, não há como recuperá-la.
                      Neste caso será necessário entrar em contato com nossa
                      central de atendimento e solicitar a revogação do
                      certificado para a emissão de um novo. Já se você tiver
                      sido atendido presencialmente, então você poderá solicitar
                      uma cópia do documento reservado onde constam os dados de
                      emissão, comparecendo na loja onde fez o certificado
                      acompanhado do seu documento de identificação com foto.
                      Somente o titular pode solicitar este documento.
                    </Text>
                  ),
                },
                {
                  title: "Sincronização de senha, como fazer?",
                  content: (
                    <>
                      <Text fontSize="lg" color="gray.700" mb={4}>
                        É possível sincronizar o novo celular com o Bird ID.
                        Você deve:
                      </Text>
                      <Box pl={5} mb={4}>
                        <UnorderedList
                          spacing={3}
                          fontSize="lg"
                          color="gray.600"
                        >
                          <ListItem>
                            Baixar o app Bird ID no novo dispositivo;
                          </ListItem>
                          <ListItem>Abrir o aplicativo;</ListItem>
                          <ListItem>
                            Criar a senha de acesso ao aplicativo;
                          </ListItem>
                          <ListItem>Acessar o menu lateral;</ListItem>
                          <ListItem>
                            Clique na opção “Sincronizar dispositivo”;
                          </ListItem>
                          <ListItem>
                            Digite seu CPF e a senha do Portal Bird ID.
                          </ListItem>
                        </UnorderedList>
                      </Box>
                      <Text fontSize="lg" color="teal.600" fontWeight="bold">
                        E pronto! Seu Bird ID estará pronto para utilização em
                        seu novo celular.
                      </Text>
                    </>
                  ),
                },
                {
                  title: "Instalação do Bird ID, como fazer?",
                  content: (
                    <Box>
                      <Box fontWeight="bold" mb={2}>
                        Para instalar o aplicativo Bird ID no seu dispositivo,
                        siga este passo a passo:
                      </Box>
                      <UnorderedList pl={10}>
                        <ListItem>
                          <Text as="span" fontWeight="bold">
                            Baixe o Aplicativo.
                          </Text>
                          <UnorderedList pl={10}>
                            <ListItem>
                              <Text as="span" fontWeight="bold">
                                Para Android:
                              </Text>
                              <UnorderedList pl={10}>
                                <ListItem>
                                  Abra o Google Play Store no seu dispositivo.
                                </ListItem>
                                <ListItem>
                                  Pesquise por "Bird ID" na barra de pesquisa.
                                </ListItem>
                                <ListItem>
                                  Quando encontrar o aplicativo, toque em
                                  "Instalar".
                                </ListItem>
                              </UnorderedList>
                            </ListItem>
                            <ListItem>
                              <Text as="span" fontWeight="bold">
                                Para iOS:
                              </Text>
                              <UnorderedList pl={10}>
                                <ListItem>
                                  Abra a App Store no seu dispositivo.
                                </ListItem>
                                <ListItem>Pesquise por "Bird ID".</ListItem>
                                <ListItem>
                                  Toque em "Obter" e siga as instruções para
                                  instalar.
                                </ListItem>
                              </UnorderedList>
                            </ListItem>
                          </UnorderedList>
                        </ListItem>
                        <ListItem>
                          <Text as="span" fontWeight="bold">
                            Abra o Bird ID:
                          </Text>
                          Depois de instalado, abra o aplicativo Bird ID.
                        </ListItem>
                        <ListItem>
                          <Text as="span" fontWeight="bold">
                            Crie Sua Conta:
                          </Text>
                          Se você ainda não possui uma conta, escolha a opção
                          para criar uma nova conta. Siga as instruções
                          fornecidas para preencher informações pessoais e
                          configurar uma senha segura.
                        </ListItem>
                        <ListItem>
                          <Text as="span" fontWeight="bold">
                            Verifique Sua Conta:
                          </Text>
                          Alguns serviços podem exigir verificação, como o envio
                          de um código de verificação por SMS ou e-mail. Siga as
                          instruções para concluir a verificação.
                        </ListItem>
                        <ListItem>
                          <Text as="span" fontWeight="bold">
                            Configure Seu Bird ID:
                          </Text>
                          Após a verificação, faça login com seu CPF e senha que
                          você criou. Defina as preferências de segurança, como
                          a criação de uma senha adicional ou identificação
                          biométrica, se disponível.
                        </ListItem>
                        <ListItem>
                          <Text as="span" fontWeight="bold">
                            Sincronize Seus Dispositivos (Opcional):
                          </Text>
                          Para utilizar o Bird ID em outro dispositivo, siga o
                          seguinte procedimento:
                          <UnorderedList pl={10}>
                            <ListItem>
                              Abra o menu lateral no aplicativo.
                            </ListItem>
                            <ListItem>
                              Escolha a opção "Sincronizar Dispositivo".
                            </ListItem>
                            <ListItem>
                              Informe seu CPF e a senha do Bird ID para permitir
                              o acesso em um novo dispositivo.
                            </ListItem>
                          </UnorderedList>
                        </ListItem>
                        <ListItem>
                          <Text as="span" fontWeight="bold">
                            Conclua a Instalação:
                          </Text>
                          Pronto! O Bird ID está agora configurado e pronto para
                          ser utilizado. Caso tenha dúvidas ou encontre
                          problemas, entre em contato com o suporte do Bird ID
                          para assistência detalhada.
                        </ListItem>
                      </UnorderedList>
                    </Box>
                  ),
                },
                {
                  title: "Como emiter um certificado digital?",
                  content: (
                    <>
                      <Text>Video Exemplo:</Text>
                    </>
                  ),
                },
              ].map((faq, index) => (
                <AccordionItem key={index} border="none">
                  <h2>
                    <AccordionButton
                      border="hidden"
                      _expanded={{ color: "teal.600", bg: "green.50" }}
                      _hover={{ bg: "green.300" }}
                      transition="all 0.3s"
                    >
                      <Box
                        as="span"
                        fontSize="xl"
                        flex="1"
                        textAlign="left"
                        p={2}
                      >
                        • {faq.title}
                      </Box>
                      <Icon
                        as={AccordionIcon}
                        fontSize="2xl"
                        color="teal.500"
                      />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md" color="gray.700">
                    {faq.content}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </Flex>
      </Flex>
      <FooterComponent />
    </Flex>
  );
}
