"use client";
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { BsFillClockFill } from "react-icons/bs";
import CreateNow from "@/actions/alertaNow/services/createNow";
import { useEffect, useState } from "react";
import GetAlertaNow from "@/actions/alertaNow/services/getAlertaNow";


const rgbBlink = keyframes`
  0% { color: red; }
  14% { color: yellow; }
  28% { color: green; }
  42% { color: cyan; }
  57% { color: blue; }
  71% { color: magenta; }
  85% { color: purple; }
  100% { color: red; }
`;


interface BtnNowProps {
  id: number;
  andamento: string;
  ativo: boolean;
  distrato: boolean;
  construtora: number;
  alertaNow: boolean;
}

export default function BtnNow({
  id,
  andamento,
  ativo,
  distrato,
  construtora,
  alertaNow,
}: BtnNowProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertaNowState, setAlertaNowState] = useState(alertaNow);

  useEffect(() => {
    const fetchAlertaNow = async () => {
      const req = await GetAlertaNow(id);
      setAlertaNowState(!!req);
    };

    fetchAlertaNow();
  }, [id]);

  const handleConfirm = async () => {
    const req = await CreateNow({
      id,
      andamento,
      ativo,
      distrato,
      construtora,
    });
    if (req.error) {
      toast({
        position: "top",
        title: "Erro ao criar alerta!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title: "Alerta criado com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setAlertaNowState(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);  
    }
    onClose();
  };

  return (
    <>
      {alertaNowState && !["EMITIDO", "REVOGADO", "APROVADO"].includes(andamento) && ativo ? (
        <Box
          alignSelf={"center"}
          w={"fit-content"}
          h={"fit-content"}
          as="span"
          fontWeight="bold"
          sx={{
            transform: "rotate(-90deg)",
            textOrientation: "upright",
            animation: `${rgbBlink} 2s infinite`,
          }}
        >
          N O W
        </Box>
      ) : ativo &&
        !distrato &&
        !["EMITIDO", "REVOGADO", "APROVADO"].includes(andamento) &&
        construtora === 5 ? (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <PopoverTrigger>
            <IconButton
              icon={<BsFillClockFill />}
              variant="outline"
              colorScheme="green"
                size="sm"
              mr={2}
              _hover={{ bg: "green.300", color: "white", border: "none" }}
              aria-label={"Agora"}
              onClick={onOpen}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>Deseja criar um alerta para agora?</PopoverBody>
            <PopoverFooter display="flex" gap={2} justifyContent="end">
              <Button colorScheme="red" size={"sm"} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="green" size={"sm"} onClick={handleConfirm}>
                Confirmar
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      ) : (
        <Box ms={10}></Box>
      )}
    </>
  );
}
