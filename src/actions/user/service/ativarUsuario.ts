"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ativarUsuario(id: number) {
 
   if(id > 0) {
    await prisma.nato_user.update({
      where: {
        id: id,
      },
      data: {
        status: true,
      },
    });
    await prisma.$disconnect();
    return {error: false, message: "Usuário ativado com sucesso"};
  } else {
    await prisma.$disconnect();
    return {error: true, message: "Erro interno, Usuário não encontrado"};
  }
}
