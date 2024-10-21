"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DesativarEmpreendimento(id: string) {
  const request = await prisma.nato_empreendimento.findUnique({
    where: {
      id: parseInt(id)
    },
    select: {
      ativo: true
    }
  });
  if (request?.ativo === true) {
    const update = await prisma.nato_empreendimento.update({
      where: {
        id: parseInt(id)
      },
      data: {
        ativo: false
      }
    });
    return { error: false, message: "Empreendimento desativado", data: update };
  } else {
    const update = await prisma.nato_empreendimento.update({
      where: {
        id: parseInt(id)
      },
      data: {
        ativo: true
      }
    });
    return { error: false, message: "Empreendimento ativado", data: update };
  }
}
