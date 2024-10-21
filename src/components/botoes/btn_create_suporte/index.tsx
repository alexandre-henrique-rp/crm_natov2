/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { createSuportAlert } from "@/actions/solicitacoes/service/createUpdateService";
import DeleteSuporte from "@/actions/solicitacoes/service/deleteSuporte";
import GetAllSuporteId from "@/actions/solicitacoes/service/getAllSuporteId";
import GetSuporteById from "@/actions/solicitacoes/service/getSuporteId";
import UpdateService from "@/actions/solicitacoes/service/updateService";
import { SuporteTagsOptions } from "@/data/suporte";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  Text,
  useDisclosure,
  useToast,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface CreateSuportAlertProps {
  id: number;
}

export default function CreateSuportAlert({ id }: CreateSuportAlertProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [descricao, setDescricao] = useState<string>("");
  const [TagUni, setTagUni] = useState<number>(0);
  const [update, setUpdate] = useState<boolean>(false);
  const [IdUpdate, setIdUpdate] = useState<number>(0);
  const [TagsId, setTagsId] = useState<number>(0);
  const [Tags, setTags] = useState<any>([]);
  const toast = useToast();

  const HandleOnClick = async (idTag: number) => {
    setUpdate(true);
    const req = await GetSuporteById(idTag);
    if (req) {
      const selectedTag = SuporteTagsOptions.find(
        (item) => item.label === req.tag
      );
      if (selectedTag) {
        setTagUni(selectedTag.id);
        setTagsId(selectedTag.id);
      }
      setDescricao(req?.deescricao || "");
      setIdUpdate(idTag);
      onOpen();
    }
  };

  const HandleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const req = await UpdateService(IdUpdate, TagsId, descricao);
    if (req.error) {
      toast({
        title: "Erro",
        description: req.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Sucesso",
        description: req.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      fetchTags();
    }
    setUpdate(false);
    onClose();
  };

  const Handle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const req = await createSuportAlert(id, descricao, TagsId);
    if (req.error) {
      toast({
        title: "Erro",
        description: req.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Sucesso",
        description: req.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      fetchTags();
    }
    onClose();
  };

  useEffect(() => {
    fetchTags();
  }, [id, update]);

  async function fetchTags() {
    const req = await GetAllSuporteId(id);
    setTags(req || []);
  }

  const RendBoard = Tags.map((item: any) => {
    const DeleteTag = async () => {
      const request = await DeleteSuporte(item.id);
      if (!request.error) {
        toast({
          title: "Sucesso!",
          description: "Suporte deletado com sucesso.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        fetchTags();
      } else {
        toast({
          title: "Erro!",
          description: "Erro ao deletar suporte.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    return (
      <Flex
        key={item.id}
        gap={1}
        border="1px solid #b8b8b8cc"
        p={1}
        alignItems={"center"}
        borderRadius={9}
        bg={"blue.200"}
      >
        <Text
          fontSize={"0.8rem"}
          cursor={"pointer"}
          onClick={() => HandleOnClick(item.id)}
        >
          {item.tag}
        </Text>
        <Icon
          as={RxCross2}
          fontSize={"0.8rem"}
          onClick={DeleteTag}
          cursor={"pointer"}
        />
      </Flex>
    );
  });

  return (
    <>
      <Button
        py={1}
        px={5}
        border="none"
        borderRadius="4px"
        bg={"green.500"}
        color={"white"}
        _hover={{ bg: "green.600", textDecoration: "none" }}
        cursor={"pointer"}
        fontSize={"1rem"}
        onClick={() => {
          onOpen();
          setUpdate(false);
          setDescricao("");
          setTagUni(0);
        }}
      >
        Suporte
      </Button>

      {RendBoard}

      <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {update ? "Editar Suporte" : "Anexar Suporte"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap={5}>
              <FormControl>
                <FormLabel>Tag</FormLabel>
                <Select
                  onChange={(e) => {
                    const selectedId = Number(e.target.value);
                    setTagUni(selectedId);
                    setTagsId(selectedId);
                  }}
                  value={TagUni}
                  placeholder="Selecione uma Tag"
                >
                  {SuporteTagsOptions.map((i: any) => (
                    <option key={i.id} value={i.id}>
                      {i.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  w={"100%"}
                  h={"10rem"}
                  resize={"none"}
                  ps={3}
                  bg={"gray.100"}
                  boxShadow="lg"
                  onChange={(e) => setDescricao(e.target.value)}
                  value={descricao}
                />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter gap={3}>
            {update ? (
              <Button colorScheme="green" onClick={HandleUpdate}>
                Confirmar
              </Button>
            ) : (
              <Button colorScheme="green" onClick={Handle}>
                Confirmar
              </Button>
            )}
            <Button
              colorScheme="red"
              onClick={() => {
                onClose();
                setUpdate(false);
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
