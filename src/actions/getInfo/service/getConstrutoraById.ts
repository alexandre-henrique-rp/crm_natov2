'use server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetConstrutoraById = async (id?: number) => {

  if (!id) return null;
  const construtora = await prisma.nato_empresas.findUnique({
    where: {
      id: id,
    },
  });
  return construtora;
}