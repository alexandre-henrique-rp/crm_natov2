'use server'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DeleteSuporte(id: number) {
  try{
    const suporte = await prisma.nato_suporte.delete({
      where: {
        id: id,
      },
    })
    return {error: false, message: "Suporte deletado com sucesso!", data: suporte};
  }catch(err){
    console.log(err)
    return {error: true, message: "Erro ao deletar suporte!"};
  }finally{
    await prisma.$disconnect();
  }
}