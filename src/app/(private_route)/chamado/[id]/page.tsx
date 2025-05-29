"use client";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Grid,
  Heading,
  Icon,
  Image,
  Input,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, DragEvent, useCallback, useState } from "react";
import { FiSend, FiUpload, FiX } from "react-icons/fi";

type Props = {
  params: { id: string };
};
export default function NewChamadoPage({ params }: Props) {
  const { id } = params;
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const toast = useToast();
  const MAX_IMAGES = 5;

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  }, []);

  const handleFiles = useCallback(
    (files: File[]) => {
      const validFiles = files.filter((file) => file.type.startsWith("image/"));

      if (validFiles.length !== files.length) {
        toast({
          title: "Arquivo inválido",
          description: "Por favor, selecione apenas imagens",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }

      if (images.length + validFiles.length > MAX_IMAGES) {
        toast({
          title: "Limite excedido",
          description: `Você pode adicionar no máximo ${MAX_IMAGES} imagens`,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setImages((prev) => [...prev, ...validFiles]);
      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    },
    [toast]
  );

  const removeImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <Flex
      w="100%"
      h="88.6vh"
      bg="gray.500"
      p={4}
      gap={4}
      flexDir={{ base: "column", md: "row" }}
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        w={{ base: "100%", md: "70%" }}
        h={"100%"}
        bg="white"
        borderRadius="1rem"
        boxShadow="md"
        border="1px solid"
        borderColor="gray.200"
        p={4}
        gap={4}
        justifyContent={"space-between"}
      >
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          <Flex gap={3} pl={8} alignItems="end" justifyContent="flex-start">
            <Heading>Chamado</Heading>
            <Heading size="lg">Id: {id}</Heading>
          </Flex>
          <Flex gap={2} pe={10}>
            <Heading size="lg">Status: Aberto</Heading>
          </Flex>
        </Flex>
        <Divider my={4} />

        <Flex w="100%" justifyContent="center">
          <Flex w={"90%"} gap={2} flexDir="column">
            <FormLabel>Descrição do chamado</FormLabel>
            <Textarea
              placeholder="Descrição"
              w={{ base: "100%", md: "100%" }}
              h={"18rem"}
              resize="none"
              borderRadius="1rem"
              border="1px solid"
              borderColor="gray.300"
              _hover={{ borderColor: "gray.300" }}
              _focus={{ borderColor: "blue.500" }}
            />
          </Flex>
        </Flex>
        <Flex w="100%" h="25rem" justifyContent="center" gap={10}>
          <Flex w={"44%"} gap={2} h="100%" flexDir="column">
            <FormLabel>Imagens</FormLabel>
            <Flex
              w={"100%"}
              minH="150px"
              border="2px dashed"
              borderColor="gray.300"
              borderRadius="lg"
              p={4}
              justifyContent="center"
              alignItems="center"
              flexDir="column"
              gap={4}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              bg="gray.50"
              _hover={{ borderColor: "blue.500", bg: "gray.100" }}
              transition="all 0.2s"
            >
              <Icon as={FiUpload} w={8} h={8} color="gray.400" />
              <Text color="gray.500" textAlign="center">
                Arraste e solte suas imagens aqui ou
              </Text>
              <Text color="gray.400" fontSize="sm">
                Limite: {images.length}/{MAX_IMAGES} imagens
              </Text>
              <Button
                as="label"
                htmlFor="file-upload"
                colorScheme="blue"
                isDisabled={images.length >= MAX_IMAGES}
                cursor="pointer"
              >
                Selecione do computador
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  display="none"
                />
              </Button>
            </Flex>

            {previews.length > 0 && (
              <Grid
                templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
                gap={4}
                mt={4}
                h="100%"
              >
                {previews.map((preview, index) => (
                  <Box key={index} position="relative">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      borderRadius="md"
                      objectFit="cover"
                      w="80%"
                      h="80px"
                    />
                    <Button
                      position="absolute"
                      top={-2}
                      right={-2}
                      size="sm"
                      colorScheme="red"
                      borderRadius="full"
                      onClick={() => removeImage(index)}
                      p={0}
                      minW="20px"
                      h="20px"
                    >
                      <Icon as={FiX} w={3} h={3} />
                    </Button>
                  </Box>
                ))}
              </Grid>
            )}
          </Flex>

          <Flex w={"44%"} gap={4} flexDir="column">
            <Box>
              <FormLabel>Departamento</FormLabel>
              <Input
                borderColor="gray.300"
                placeholder="Departamento"
                w={"100%"}
              />
            </Box>
            <Box>
              <FormLabel>Prioridade</FormLabel>
              <Select
                borderColor="gray.300"
                placeholder="Prioridade"
                w={"100%"}
              >
                <option value="baixa">Baixa</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </Select>
            </Box>
            <Flex gap={4}>
              <Box>
                <FormLabel>Data e hora do ocorrido</FormLabel>
                <Input
                  borderColor="gray.300"
                  type="datetime-local"
                  placeholder="Data e hora do ocorrido"
                  w={"100%"}
                />
              </Box>
              <Box>
                <FormLabel>Id da solicitação</FormLabel>
                <Input
                  borderColor="gray.300"
                  type="number"
                  placeholder="Id da solicitação"
                  w={"100%"}
                />
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" gap={2} justifyContent={"flex-end"}>
          <Button colorScheme="green">Salvar</Button>
          <Button colorScheme="red">Cancelar</Button>
        </Flex>
      </Box>
      <Flex w={{ base: "100%", md: "30%" }} h={"100%"} flexDir="column" gap={4}>
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
              _focus={{ borderColor: "blue.500" }}
            />
            <Button leftIcon={<FiSend />} colorScheme="green">
              Enviar
            </Button>
          </Flex>
        </Box>
        <Box
          h={"35%"}
          w={"100%"}
          bg="gray.100"
          borderRadius="1rem"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
          px={4}
          py={8}
          overflowY="auto"
        >
          <Heading fontSize={"lg"}>Linha do tempo</Heading>
        </Box>
      </Flex>
    </Flex>
  );
}
