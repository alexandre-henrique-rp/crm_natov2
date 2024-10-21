"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DeleteConstrutora(id: number) {
  const referencias = await prisma.nato_empreendimento.findMany({
    where: {
      construtora: id
    }
  });

  if (referencias.length > 0) {
    return {
      error: true,
      message:
        "Existem Empreendimentos cadastrados para essa empresa referências na tabela ",
      data: referencias
    };
  } else {
    await prisma.nato_empresas.delete({
      where: {
        id: id
      }
    });
    await prisma.$disconnect();
    return { error: false };
  }
}
