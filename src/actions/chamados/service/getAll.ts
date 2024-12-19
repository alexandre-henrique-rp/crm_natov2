import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllChamados() {
  try {
    const chamados = await prisma.nato_chamados.findMany();
    return { error: false, message: "Chamados abertos", data: chamados || [] };
  } catch (error) {
    return {
      error: true,
      message: error instanceof Error ? error.message : "Erro desconhecido",
      data: [],
    };
  } finally {
    await prisma.$disconnect();
  }
}
