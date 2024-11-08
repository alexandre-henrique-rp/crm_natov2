'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type StatusEmpreendimento = {
    error: boolean;
    message: string;
    status: boolean;
}

export async function GetStatusEmpreendimento(id: string): Promise<StatusEmpreendimento> {
  try{
    const req = await prisma.nato_empreendimento.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        ativo: true,
      },
    });
      if(req === null || req.ativo === false){
          return {
              error: false,
              message: "Empreendimento Desativado",
              status: false,
          }
      }else{
              return {
                  error: false,
                  message: "Empreendimento Ativo",
                  status: true,
              }
          }
  }catch{
      return {
          error: true,
          message: "Erro ao buscar empreendimento",
          status: false,
      }
  }finally{
      await prisma.$disconnect();
  }
}