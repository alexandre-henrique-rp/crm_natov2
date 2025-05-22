"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface InputFileUploadProps {
  label: string;
  id: string;
  onvalue: (url: string) => void;
  value?: any;
  required?: boolean;
  isDisabled?: boolean;
  boxWidth?: string;
}

export default function InputFileUpload({
  label,
  id,
  onvalue,
  value,
  required = false,
  isDisabled = false,
  boxWidth = "100%",
}: InputFileUploadProps) {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("Nenhum arquivo escolhido");

  useEffect(() => {
    if (value) {
      const parts = value.url_view.split("/");
      setFileName(parts[parts.length - 1]);
    }
  }, [value]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", id);

    try {
      const response = await fetch(`/api/doc/post`, {
        method: "POST",

        body: formData,
      });

      const fileUrl = await response.json();
      onvalue(fileUrl.data);

      const uploadedName = file.name;
      setFileName(uploadedName);

      toast({
        title: "Arquivo salvo",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao salvar arquivo",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <FormControl
      id={id}
      isRequired={required}
      isDisabled={isDisabled}
      w={boxWidth}
    >
      <FormLabel fontSize="sm">{label}</FormLabel>
      <Flex align="center" rounded={"md"} border={"1px solid #ccc"}>
        <input
          type="file"
          ref={inputRef}
          accept=".jpg, .png, .pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Flex
          p={1}
          roundedStart={"md"}
          h={"full"}
          bg={"gray.100"}
          onClick={triggerFileInput}
          _hover={{ cursor: "pointer", bg: "gray.200" }}
          mr={2}
          fontSize={"sm"}
        >
          Selecionar arquivo
        </Flex>
        <Text p={1} fontSize="sm" color="gray.600" noOfLines={1}>
          {fileName}
        </Text>
      </Flex>
    </FormControl>
  );
}
