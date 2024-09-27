/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Flex,
} from "@chakra-ui/react";

function TermsOfServicePage() {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      mx={2}
      borderWidth={0}
      overflowX="auto"
      flexDir={"column"}
    >
      <Box
        w="50%"
        m={5}
        h="100%"
        p={10}
        bg="white"
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          Termos de Serviço
        </Heading>

        <Box p={6} borderRadius="lg" mb={8}>
          <Text fontSize="lg" mb={4}>
            Bem-vindo aos Termos de Serviço do rede brasil rp!
          </Text>

          <Text fontSize="lg" mb={4}>
            Estes termos e condições descrevem as regras e regulamentos para o
            uso do site da rede brasil rp, localizado em redebrasilrp.com.br.
          </Text>

          <Text fontSize="lg" mb={4}>
            Ao acessar este site, presumimos que você aceita estes termos e
            condições na íntegra. Não continue a usar o site da rede brasil rp
            se você não aceitar todos os termos e condições estabelecidos nesta
            página.
          </Text>

          <Text fontSize="lg" mb={4}>
            Os seguintes terminologias aplicam-se a estes Termos de Serviço,
            Declaração de Privacidade e Aviso de Isenção de Responsabilidade e
            todos os Contratos: "Cliente", "Você" e "Seu" referem-se a você, a
            pessoa que acessa este site e aceita os termos e condições da
            Empresa. "A Empresa", "Nós", "Nossos", "O Nosso" e "Nós Mesmos",
            referem-se à nossa Empresa. "Parte", "Partes" ou "Nós", refere-se
            tanto ao Cliente como a nós mesmos. Todos os termos referem-se à
            oferta, aceitação e consideração do pagamento necessário para
            realizar o processo de nossa assistência ao Cliente da maneira mais
            apropriada para o propósito expresso de atender às necessidades do
            Cliente no que diz respeito à prestação dos serviços declarados da
            Empresa, de acordo com e sujeito à lei vigente do Brasil.
          </Text>
        </Box>
        <Heading as="h3" size="lg" mb={4}>
          Uso do Site
        </Heading>

        <Box p={6} borderRadius="lg" mb={8}>
          <Text fontSize="lg" mb={4}>
            Você pode usar nosso site desde que você concorde com todos os
            termos estabelecidos nesta página.
          </Text>

          <Text fontSize="lg" mb={4}>
            Você não deve:
          </Text>

          <UnorderedList fontSize="lg" mb={4}>
            <ListItem>Republicar material deste site em outro lugar;</ListItem>
            <ListItem>
              Vender, alugar ou sub-licenciar material deste site;
            </ListItem>
            <ListItem>
              Reproduzir, duplicar ou copiar material deste site;
            </ListItem>
            <ListItem>
              Distribuir conteúdo deste site, a menos que seja especificamente
              permitido;
            </ListItem>
          </UnorderedList>
        </Box>

        <Heading as="h3" size="lg" mb={4}>
          Seus Detalhes
        </Heading>

        <Box p={6} borderRadius="lg">
          <Text fontSize="lg" mb={4}>
            No nosso site, coletamos e usamos as informações para os propósitos
            especificados. Nós não vendemos, compartilhamos ou alugamos suas
            informações pessoais para terceiros.
          </Text>
          <Text fontSize="lg">
            Esta política é efetiva a partir de 27 de maio de 2024 às 17:29.
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default TermsOfServicePage;
