'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GetAllSuporteId(id: number) {
  try {
    const suporte = await prisma.nato_suporte.findMany({
      where: {
        solicitacao: id,
      },
    });    
    return suporte;
  } catch (error: any) {
    console.log("erro ao buscar tags",error.message);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}