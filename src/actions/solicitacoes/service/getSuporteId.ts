'use server'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GetSuporteById(id: number) {
  const suporte = await prisma.nato_suporte.findUnique({
    where: {
      id: id,
    },
  });
  await prisma.$disconnect();
  return suporte;
}