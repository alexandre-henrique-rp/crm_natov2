"use client";

import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BsFillTrashFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

interface BtnExcluirFinanceiraProps {
  id: number;
}

export function BtnExcluirFinanceira({ id }: BtnExcluirFinanceiraProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const route = useRouter();

  const handleExcluir = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(`/api/financeira/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: true,
      }),
    });

    if (response.ok) {
      toast({
        title: "Sucesso!",
        description: "Financeira excluído com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      onClose();
      route.refresh();
    } else {
      toast({
        title: "Erro!",
        description: "Ocorreu um erro ao excluir a Financeira!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      onClose();
    }
  };

  return (
    <>
      <Tooltip label="Excluir Financeira">
        <IconButton
          colorScheme="red"
          variant="outline"
          icon={<BsFillTrashFill />}
          aria-label="Delete"
          onClick={onOpen}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalBody p={10}>
            <Text fontWeight={"bold"} fontSize={"20px"} textAlign={"center"}>
              Você tem certeza de que deseja deletar esta Financeira?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button leftIcon={<MdOutlineCancel />} onClick={onClose}>
              Cancelar
            </Button>

            <Button
              leftIcon={<BsFillTrashFill />}
              onClick={() => handleExcluir}
              colorScheme="red"
            >
              Confirmar Exclusão
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
