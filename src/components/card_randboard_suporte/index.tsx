"use client";
import DeleteSuporte from "@/actions/solicitacoes/service/deleteSuporte";
import GetAllSuporteId from "@/actions/solicitacoes/service/getAllSuporteId";
import GetSuporteById from "@/actions/solicitacoes/service/getSuporteId";
import UpdateService from "@/actions/solicitacoes/service/updateService";
import { SuporteTags, SuporteTagsOptions } from "@/data/suporte";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  useToast,
  Text
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import useUserCompraContext from "@/hook/useUserCompraContext";

interface CreateSuportAlertProps { 
  id: number;
} 

export default function RandBoardSuporte({id}: CreateSuportAlertProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [descricao, setDescricao] = useState<string>("");
  const [Tags, setTags] = useState<any>([]);
 const { ServiceTags, setServiceTags} = useUserCompraContext();
 const toast = useToast();
 
 const HandleOnClick = async (idTag: number) => {
      const req = await GetSuporteById(idTag);
      console.log("🚀 ~ HandleOnClick ~ idTag:", idTag)
      
      setTags(req?.tag);
      setDescricao(req?.deescricao ?? "");
      
        onOpen();
        
    } 


  const Handle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const req = await UpdateService(id, descricao, Tags);
    if(req.error){
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
    }
    onClose();
  };

  useEffect(() => {
    (async () => {
      const req = await GetAllSuporteId(id);
      if(req) {
        const data = req.map((item: any) => ({
          id: item.id,
          label: item.tag,
        }));
        setServiceTags(data);
      } else {
        setServiceTags([]);
      }
    })();
  }, [id]);

  const RendBoard = ServiceTags.map((item: SuporteTags) => {
    const DeleteTag = async () => {
      const request = await DeleteSuporte(item.id);
      if (!request) {
        toast({
          title: "Sucesso!",
          description: "Suporte deletado com sucesso.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        const filter = Tags.filter((f: SuporteTags) => f.id !== item.id);
        setTags(filter);
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
        <Text fontSize={"0.8rem"} cursor={"pointer"} onClick={() => HandleOnClick(item.id)}>
          {item.label}
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
      {RendBoard}

      <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Anexar Suporte</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap={5}>
              <FormControl>
                <FormLabel>Tag</FormLabel>
                <Select
                  onChange={(e) => setTags(Number(e.target.value))}
                  placeholder="Selecione uma Tag"
                  value={Tags}
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
                  value={descricao}
                  w={"100%"}
                  h={"10rem"}
                  resize={"none"}
                  ps={3}
                  bg={"gray.100"}
                  boxShadow="lg"
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button colorScheme="green" onClick={Handle}>
              Confirmar
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
