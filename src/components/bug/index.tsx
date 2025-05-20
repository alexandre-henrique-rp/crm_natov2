"use client";
import { Alert, AlertDescription, AlertTitle, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { GoAlertFill } from "react-icons/go";
import { TiDelete } from "react-icons/ti";

interface BugType {
  id: number;
  tipo: string;
  message: string;
  createAt: Date;
  updatedAt: Date;
}

export const BugReport = () => {
  const [bug, setBug] = useState<BugType[]>([]);

  useEffect(() => {
    HandleFindAll();
  }, []);

  // Função responsável por buscar todos os bugs na API de forma segura
  const HandleFindAll = async () => {
    try {
      const response = await fetch(`/api/alerts/geral/findAll`);
      if (response.ok) {
        // Lê o corpo da resposta como texto
        const text = await response.text();
        // Só tenta converter para JSON se houver conteúdo
        if (text) {
          const data = JSON.parse(text);
          if (Array.isArray(data) && data.length > 0) {
            setBug(data);
          } else {
            setBug([]); // Se não houver dados, define como lista vazia
          }
        } else {
          setBug([]); // Resposta vazia, define lista vazia
        }
      } else {
        // Trata status de erro da API
        console.error("Erro na resposta da API:", response.status);
      }
    } catch (error) {
      // Exibe o erro no console para facilitar o debug
      console.log(error);
    }
  };

  const MapBug = bug?.map((bug: any) => {
    return (
      <>
        <Alert status={bug.tipo} rounded={"lg"}>
          {bug.tipo === "warning" ? (
            <GoAlertFill
              fontSize={"1.3rem"}
              color="#daa300"
              style={{ marginRight: "1rem" }}
            />
          ) : bug.tipo === "error" ? (
            <TiDelete
              fontSize={"2rem"}
              color="#f30101"
              style={{ marginRight: "0.7rem", marginLeft: "-6px" }}
            />
          ) : (
            <FaCircleInfo
              fontSize={"1.3rem"}
              color="#0066cc"
              style={{ marginRight: "1rem" }}
            />
          )}
          <AlertTitle>
            {bug.tipo === "warning"
              ? "Alerta"
              : bug.tipo === "error"
              ? "Erro"
              : "Informação"}
          </AlertTitle>
          <AlertDescription>{bug.message}</AlertDescription>
        </Alert>
      </>
    );
  });

  return (
    <>
      {bug.length > 0 && (
        <Flex flexDir="column" gap={3} mx={0}>
          {MapBug}
        </Flex>
      )}
    </>
  );
};
