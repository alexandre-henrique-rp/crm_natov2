"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ativarUsuario(id: number) {
 
   if(id > 0) {
    const usuario = await prisma.nato_user.update({
      where: {
        id: id,
      },
      data: {
        status: true,
      },
    });

    return {error: false, message: "Usuário ativado com sucesso"};
  } else {
    return {error: true, message: "Erro interno, Usuário não encontrado"};
  }
}
