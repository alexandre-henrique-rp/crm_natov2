'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GetAllSuporteId(id: number) {
  const suporte = await prisma.nato_suporte.findMany({
    where: {
      solicitacao: id,
    },
  });
  await prisma.$disconnect();
  return suporte;
}