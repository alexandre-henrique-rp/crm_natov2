import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Link,
  Flex,
} from "@chakra-ui/react";

function PrivacyPolicyPage() {
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
          Política de Privacidade
        </Heading>
        <Box p={6} borderRadius="lg" mb={8}>
          <Text fontSize="lg" mb={4}>
            A sua privacidade é importante para nós. É política do rede brasil
            rp respeitar a sua privacidade em relação a qualquer informação sua
            que possamos coletar no site rede brasil rp, e outros sites que
            possuímos e operamos.
          </Text>
          <Text fontSize="lg" mb={4}>
            Solicitamos informações pessoais apenas quando realmente precisamos
            delas para lhe fornecer um serviço. Fazemo-lo por meios justos e
            legais, com o seu conhecimento e consentimento. Também informamos
            por que estamos coletando e como será usado.
          </Text>
          <Text fontSize="lg" mb={4}>
            Apenas retemos as informações coletadas pelo tempo necessário para
            fornecer o serviço solicitado. Quando armazenamos dados, protegemos
            dentro de meios comercialmente aceitáveis ​​para evitar perdas e
            roubos, bem como acesso, divulgação, cópia, uso ou modificação não
            autorizados.
          </Text>
          <Text fontSize="lg" mb={4}>
            Não compartilhamos informações de identificação pessoal publicamente
            ou com terceiros, exceto quando exigido por lei.
          </Text>
          <Text fontSize="lg" mb={4}>
            O nosso site pode ter links para sites externos que não são operados
            por nós. Esteja ciente de que não temos controle sobre o conteúdo e
            práticas desses sites e não podemos aceitar responsabilidade por
            suas respectivas políticas de privacidade.
          </Text>
          <Text fontSize="lg" mb={4}>
            Você é livre para recusar a nossa solicitação de informações
            pessoais, entendendo que talvez não possamos fornecer alguns dos
            serviços desejados.
          </Text>
          <Text fontSize="lg" mb={4}>
            O uso continuado de nosso site será considerado como aceitação de
            nossas práticas em torno de privacidade e informações pessoais. Se
            você tiver alguma dúvida sobre como lidamos com dados do usuário e
            informações pessoais, entre em contato conosco.
          </Text>
        </Box>
        <Heading as="h3" size="lg" mb={4}>
          Compromisso do Usuário
        </Heading>
        <Box p={6} borderRadius="lg" mb={8}>
          <Text fontSize="lg" mb={4}>
            O usuário se compromete a fazer uso adequado dos conteúdos e da
            informação que o rede brasil rp oferece no site e com caráter
            enunciativo, mas não limitativo:
          </Text>
          <UnorderedList fontSize="lg" mb={4}>
            <ListItem>
              A) Não se envolver em atividades que sejam ilegais ou contrárias à
              boa fé a à ordem pública;
            </ListItem>
            <ListItem>
              B) Não difundir propaganda ou conteúdo de natureza racista,
              xenofóbica, Bet Nacional ou azar, qualquer tipo de pornografia
              ilegal, de apologia ao terrorismo ou contra os direitos humanos;
            </ListItem>
            <ListItem>
              C) Não causar danos aos sistemas físicos (hardwares) e lógicos
              (softwares) do rede brasil rp, de seus fornecedores ou terceiros,
              para introduzir ou disseminar vírus informáticos ou quaisquer
              outros sistemas de hardware ou software que sejam capazes de
              causar danos anteriormente mencionados.
            </ListItem>
          </UnorderedList>
        </Box>
        <Heading as="h3" size="lg" mb={4}>
          Mais informações
        </Heading>
        <Box p={6} borderRadius="lg">
          <Text fontSize="lg" mb={4}>
            Esperemos que esteja esclarecido e, como mencionado anteriormente,
            se houver algo que você não tem certeza se precisa ou não,
            geralmente é mais seguro deixar os cookies ativados, caso interaja
            com um dos recursos que você usa em nosso site.
          </Text>
          <Text fontSize="lg">
            Esta política é efetiva a partir de 27 May 2024 17:29
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default PrivacyPolicyPage;
