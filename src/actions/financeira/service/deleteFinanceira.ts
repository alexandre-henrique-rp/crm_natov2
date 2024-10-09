'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();  

export async function DeleteFinanceira(id: string) {
  try {
    const request = await prisma.nato_financeiro.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { error: false, message: "Financeira deletada", data: request };
  } catch (error) {
    return { error: true, message: "Erro ao deletar Financeira", data: error };
  } finally {
    await prisma.$disconnect();
  }
}
