"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function DeleteEmpreendimento(id: string) {
  try {
    // const request = await prisma.nato_empreendimento.delete({
    // where: {
    //     id: parseInt(id),
    // },
    // });
    // return { error: false, message: "Empreendimento deletado", data: request };
  } catch (error) {
    return {
      error: true,
      message: "Erro ao deletar Empreendimento",
      data: error,
    };
  } finally {
    await prisma.$disconnect();
  }
}
