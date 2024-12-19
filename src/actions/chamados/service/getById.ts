import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getById(id: any) {
 try{
    const res =  await prisma.nato_chamados.findMany({
        where: {
            idUser: id
        }
    })
    return { error: false, message: "Chamados abertos", data: res || [] };
 }catch (error) {
    return {
        error: true,
        message: error instanceof Error ? error.message : "Erro desconhecido",
        data: [],
      };
 }finally{
    await prisma.$disconnect();
 }
}