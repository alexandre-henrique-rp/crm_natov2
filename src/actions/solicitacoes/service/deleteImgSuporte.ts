'use server'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DeleteImgSuporte(id: number, index: number) {

    try {
    const suporte = await prisma.nato_suporte.findUnique({
        where: {
            id: id,
        },
        select: {
            urlSuporte: true
        }
    })
    if(suporte && suporte.urlSuporte){
        const urlSuporte = JSON.parse(suporte.urlSuporte)
        urlSuporte.splice(index, 1)

        await prisma.nato_suporte.update({
            where: {
                id: id,
            },
            data: {
                urlSuporte: JSON.stringify(urlSuporte),
            }
        });
    }
    return {error: false, message: "Imagem deletada com sucesso"};
  } catch {
     return {error: true, message: "Erro ao deletar imagem"};
  } finally {
    await prisma.$disconnect();
  }
}