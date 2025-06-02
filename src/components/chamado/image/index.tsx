"use client";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  Icon,
  Input,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { ChangeEvent, DragEvent, useCallback, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";

interface ImageComponentProps {
  onChange: (files: File[]) => void;
}

export const ImageComponent = ({ onChange }: ImageComponentProps) => {
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
        return;
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

      setImages((prev) => {
        const newImages = [...prev, ...validFiles];
        onChange(newImages); // Notifica o componente pai sobre as novas imagens
        return newImages;
      });

      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    },
    [images, toast, onChange, MAX_IMAGES]
  );

  const removeImage = useCallback((index: number) => {
    setImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      onChange(newImages); // Atualiza o componente pai quando uma imagem é removida
      return newImages;
    });
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }, [onChange]);

  return (
    <>
      <Flex w={"full"} gap={2} h="full" flexDir="column">
        <FormLabel>Imagens</FormLabel>
        <Flex
          w={"full"}
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
                  objectPosition="center"
                  w={{base: "100px", lg: "150px"}}
                  h={{base: "70px", lg: "80px"}}
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
    </>
  );
};
