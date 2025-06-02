"use client";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import HistoricoComponent from "../historico";
import MensagensChat from "../mensagensChat";
import { ImageComponent } from "./image";
import { useEffect, useState } from "react";
import { DetalhesChamadoComponent } from "./detalhes";
import { useRouter } from "next/navigation";
import ImageViewComponent from "./image_view";

interface ChamadoProps {
  data: TypeChamado | null;
  session: SessionNext.Client;
}

type TypeChamado = {
  id: number;
  descricao?: string;
  status: string;
  idUser?: number;
  idResposta?: number;
  resposta?: string;
  createAt: string;
  updatedAt?: string;
  solicitacaoId?: number;
  temp: any[];
  chat: any[];
  images: any[];
  images_adm: any[];
  respostaData?: any;
  User?: any;
  solicitacaoData: any;
};

export const ChamadoRootComponent = ({ data, session }: ChamadoProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [departamento, setDepartamento] = useState<string>("");
  const [prioridade, setPrioridade] = useState<string>("");
  const [dth_qru, setDthQru] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [status, setStatus] = useState<string>("ABERTO");
  const [solicitacaoId, setSolicitacaoId] = useState<number>(0);
  const [DadosChamado, setDadosChamado] = useState<TypeChamado | null>(null);

  const toast = useToast();
  const router = useRouter();

  const SaveChat = async(chat: any) => {
    try {
      if(!DadosChamado?.id){
        throw new Error("Chamado não encontrado");
      }
      const dataChat = {
        chat,
        temp: [ ...DadosChamado?.temp,{
          id: new Date().getTime().toString(),
          descricao: `Mensagem enviada por ${session.nome}`,
          createAt: new Date().toISOString(),
        }],
      };
      const response = await fetch(`/api/chamado/put/${DadosChamado?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataChat),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setDadosChamado(result);
      toast({
        title: "Sucesso",
        description: "Mensagem enviada com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || error || "Erro ao salvar mensagem",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const SaveImage = async () => {
    if (images.length === 0) return [];

    try {
      // Usar Promise.all para aguardar todas as imagens serem enviadas
      const uploadPromises = images.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("type", "chamado");

        const response = await fetch("/api/doc/post", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }

        // Verifica se result.data existe e não é null
        if (!result.data) {
          console.error("Upload falhou - resultado inválido:", result);
          return null;
        }

        return result.data;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      // Filtra quaisquer resultados nulos
      const validImages = uploadedImages.filter((img) => img !== null);

      if (validImages.length === 0 && images.length > 0) {
        throw new Error("Nenhuma imagem foi enviada com sucesso");
      }

      return validImages;
    } catch (error) {
      console.error("Erro ao enviar imagens:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      // Primeiro faz upload das imagens e aguarda o resultado
      const uploadedImages = await SaveImage();

      // Preparar dados do chamado com as imagens já processadas
      const data = {
        departamento,
        prioridade,
        dth_qru: new Date(dth_qru).toISOString(),
        descricao,
        status,
        solicitacaoId,
        idUser: session.id,
        images: uploadedImages, // Usa diretamente o resultado do upload
        temp: !DadosChamado?.id ? [
          {
            id: new Date().getTime().toString(),
            descricao: `Chamado criado por ${session.nome}`,
            createAt: new Date().toISOString(),
          },
        ] : [...DadosChamado?.temp, {
          id: new Date().getTime().toString(),
          descricao: `Chamado atualizado por ${session.nome}`,
          createAt: new Date().toISOString(),
        }],
      };

      const url = !DadosChamado?.id ? "/api/chamado/post" : `/api/chamado/put/${DadosChamado?.id}`;
      const methodSet = !DadosChamado?.id ? "POST" : "PATCH ";
      // Enviar dados do chamado
      const response = await fetch( url, {
        method: methodSet,
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast({
        title: "Sucesso",
        description: "Chamado salvo com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push(`/chamado/${result.data.id}`);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSetImage = (files: File[]) => {
    setImages(files);
  };

  useEffect(() => {
    if(data){
      if(!descricao) {
        setDescricao(data.descricao || "");
      }
      if(!DadosChamado){
        setDadosChamado(data);
      }
    }
  }, [data]);

  return (
    <>
      <Flex
        w="full"
        h={{ base: "auto", lg: "full" }}
        bg="gray.500"
        p={4}
        gap={4}
        flexDir={{ base: "column", lg: "row" }}
      >
        <Box
          display={"flex"}
          flexDir={"column"}
          w={{ base: "full", lg: "70%" }}
          h={{ base: "auto", lg: "full" }}
          bg="white"
          borderRadius="1rem"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
          p={4}
          gap={4}
          justifyContent={"space-between"}
        >
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <Flex gap={3} pl={8} alignItems="end" justifyContent="flex-start">
              <Heading>Chamado</Heading>
              {DadosChamado?.id && <Heading size="lg">Id: {DadosChamado?.id}</Heading>}
            </Flex>
            <Flex gap={2} pe={10}>
              {session?.role?.adm ? (
                <>
                  {DadosChamado?.status && (
                    <Flex gap={2} alignItems="center">
                      <Heading size="lg">Status</Heading>
                      <Select
                        value={status}
                        name="status"
                        size="sm"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="ABERTO">Aberto</option>
                        <option value="EM_ANDAMENTO">Em andamento</option>
                        <option value="LV2">Enviado para nível 2</option>
                        <option value="CONCLUIDO">Concluído</option>
                      </Select>
                    </Flex>
                  )}
                </>
              ) : (
                <>
                  {DadosChamado?.status && (
                    <Heading size="lg">Status: {DadosChamado?.status}</Heading>
                  )}
                </>
              )}
            </Flex>
          </Flex>
          <Divider border={"1px solid"} borderColor="gray.300" my={4} />

          <Flex
            w="full"
            alignItems="center"
            justifyContent="flex-start"
            gap={8}
            flexDir={"column"}
          >
            <Flex w={"90%"} h={"20rem"} gap={2} flexDir="column">
              <FormLabel>Descrição do chamado</FormLabel>
              <Textarea
                placeholder="Descrição"
                w="full"
                h="full"
                resize="none"
                borderRadius="1rem"
                border="1px solid"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.300" }}
                _focus={{ borderColor: "blue.500" }}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Flex>
            <Flex w={"90%"} h={"25rem"} gap={8}>
              {!DadosChamado?.id && <ImageComponent onChange={handleSetImage} />}
              {DadosChamado?.id && (
                <Flex gap={2} w="full" h="full" flexWrap="wrap">
                  {DadosChamado?.images?.map(
                    (image: { url_view: string; url_download: string }) => (
                      <>
                        <ImageViewComponent imageUrl={image.url_view} />
                      </>
                    )
                  )}
                </Flex>
              )}
              <DetalhesChamadoComponent
                Departamento={setDepartamento}
                Prioridade={setPrioridade}
                DthQru={setDthQru}
                cliente={setSolicitacaoId}
                data={DadosChamado}
              />
            </Flex>
          </Flex>
          <Flex w="full" justifyContent={"flex-end"}>
            <Button colorScheme="green" onClick={handleSave}>
              Salvar
            </Button>
          </Flex>
        </Box>

        <Flex
          w={{ base: "full", lg: "30%" }}
          h={{ base: "auto", lg: "full" }}
          flexDir="column"
          gap={4}
        >
          <Box h={"65%"} w={"full"}>
            <MensagensChat
              id={DadosChamado?.id || 0}
              data={DadosChamado?.chat || []}
              session={session}
              onSend={SaveChat}
            />
          </Box>

          <Box h={"35%"} w={"full"}>
            <HistoricoComponent data={DadosChamado?.temp || []} />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
