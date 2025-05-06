"use client";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

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

  const HandleFindAll = async () => {
    try {
      const response = await fetch(`/api/alerts/geral/findAll`);
      const data = await response.json();
      if (response.ok) {
        if (data.length > 0) {
          setBug(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const MapBug = bug?.map((bug: any) => {
    return (
      <>
        <Alert status={bug.tipo} rounded={"lg"}>
          <AlertIcon />
          <AlertTitle>{bug.tipo}</AlertTitle>
          <AlertDescription>{bug.message}</AlertDescription>
        </Alert>
      </>
    );
  });

  return <>{bug.length > 0 && <Box my={4} mb={10}>{MapBug}</Box>}</>;
};
