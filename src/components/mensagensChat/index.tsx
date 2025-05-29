"use client";
import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { FiSend } from "react-icons/fi";

interface MensagensProps {
  id: number;
  data: MensagemObj[];
  session: SessionNext.Client;
  onSend: (message: MensagemObj[]) => void;
}

type MensagemObj = {
  id: string;
  mensagem: string;
  data: string;
  hora: string;
  autor: string;
};

const formatarData = (data: string) => {
  return new Date(data).toLocaleDateString("pt-BR");
};

const formatarHora = (hora: string) => {
  return new Date(hora).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * @param id id do chamado ou solicitacao para liberar o chat
 * @param data [{id: string, mensagem: string, data: string, hora: string, autor: string}] array de mensagens deve conter id, mensagem, data, hora e autor
 * @param session dados do usuario logado
 * @param onSend função para enviar mensagem separada do componente
 * @returns JSX.Element
 */
export default function MensagensChat({
  id,
  data,
  session,
  onSend,
}: MensagensProps) {
  const [message, setMessage] = useState("");
  const chat: MensagemObj[] = data || [];

  const handleSend = () => {
    if (!message.trim() || !session?.nome) return;

    const newMessage: MensagemObj = {
      id: new Date().getTime().toString(),
      mensagem: message.trim(),
      data: new Date().toISOString(),
      hora: new Date().toISOString(),
      autor: session.nome,
    };

    onSend([...chat, newMessage]);
    setMessage("");
  };

  // Renderiza as mensagens separando por autor
  const mensagens = chat.map((item: MensagemObj) => {
    if (item.autor === session?.nome) {
      return (
        <Flex key={item.id} gap={2} justifyContent="flex-end">
          <Box bg="blue.100" p={2} borderRadius="1rem">
            <Text fontSize="xs" color="gray.500">
              {item.autor}
            </Text>
            <Text>{item.mensagem}</Text>
            <Flex gap={2}>
              <Text fontSize="xs" color="gray.500">
                {formatarData(item.data)}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {formatarHora(item.hora)}
              </Text>
            </Flex>
          </Box>
        </Flex>
      );
    } else {
      return (
        <Flex key={item.id} gap={2} justifyContent="flex-start">
          <Box bg="gray.100" p={2} borderRadius="1rem">
            <Text fontSize="xs" color="gray.500">
              {item.autor}
            </Text>
            <Text>{item.mensagem}</Text>
            <Flex gap={2}>
              <Text fontSize="xs" color="gray.500">
                {formatarData(item.data)}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {formatarHora(item.hora)}
              </Text>
            </Flex>
          </Box>
        </Flex>
      );
    }
  });

  return (
    <>
      {id ? (
        <Box
          h={"65%"}
          w={"100%"}
          display="flex"
          bg="gray.100"
          borderRadius="1rem"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
          px={4}
          py={8}
          flexDir="column"
          justifyContent="space-between"
          position="relative"
        >
          <Box>
            <Flex
              bg={"green.200"}
              p={2}
              borderRadius="1rem"
              w={"100%"}
              h={"28rem"}
              overflowY="auto"
            >
              {mensagens}
            </Flex>
          </Box>
          <Flex gap={2} alignItems="end">
            <Textarea
              placeholder="Mensagem"
              h={"4rem"}
              resize="none"
              borderRadius="1rem"
              border="1px solid"
              borderColor="gray.300"
              _hover={{ borderColor: !id ? "gray.300" : "gray.400" }}
              _focus={{ borderColor: !id ? "gray.300" : "blue.500" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              isDisabled={!id}
            />
            <Button
              leftIcon={<FiSend />}
              colorScheme="green"
              onClick={handleSend}
              isDisabled={!id || !message.trim()}
            >
              Enviar
            </Button>
          </Flex>
        </Box>
      ) : (
        <Box
          h={"65%"}
          w={"100%"}
          display="flex"
          bg="gray.100"
          borderRadius="1rem"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
          px={4}
          py={8}
          flexDir="column"
          justifyContent="space-between"
          position="relative"
        >
          <Box>
            <Flex
              bg={"green.200"}
              p={2}
              borderRadius="1rem"
              w={"100%"}
              h={"28rem"}
              overflowY="auto"
            >
              {" "}
            </Flex>
          </Box>
          <Flex gap={2} alignItems="end">
            <Textarea
              placeholder="Mensagem"
              h={"4rem"}
              resize="none"
              borderRadius="1rem"
              border="1px solid"
              borderColor="gray.300"
              _hover={{ borderColor: "gray.300" }}
              _focus={{ borderColor: "gray.300" }}
            />
            <Button leftIcon={<FiSend />} colorScheme="green" isDisabled={true}>
              Enviar
            </Button>
          </Flex>
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="whiteAlpha.700"
            backdropFilter="blur(2px)"
            borderRadius="1rem"
            zIndex={1}
          />
        </Box>
      )}
    </>
  );
}
