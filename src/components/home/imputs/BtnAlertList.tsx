"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TbAlertSquareRounded } from "react-icons/tb";


export default function BtnAlertList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Cont, setCont] = useState(0)
  const [Data, setData] = useState([])

  const ConstTotalAlertas = async() => {
    const url = '/api/alerts/geral/const';
    const req = await fetch(url)
    const res = await req.json()
    if (req.ok) {
      setCont(res)
    }
  }

  const HandleAlertasList = async() => {
    const url = '/api/alerts/geral/findAll';
    const req = await fetch(url)
    const res = await req.json()
    if (req.ok) {
      setData(res)
    }
  }

  useEffect(() => {
    ConstTotalAlertas()
    HandleAlertasList()
  }, [])

  return (
    <>
      <Button
        w={"100%"}
        leftIcon={<TbAlertSquareRounded size={20} />}
        onClick={onOpen}
        variant="solid"
        colorScheme="green"
      >
        Alertar {Cont}
      </Button>

      <Modal onClose={onClose} size={"xl"} isOpen={isOpen} closeOnOverlayClick={false} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lista De Alertas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>teste</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
