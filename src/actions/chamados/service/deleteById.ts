'use server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteById(id: number) {
    try{
        const res = await prisma.nato_chamados.delete({
            where: {
                id: id,
            },
        });
        return {error: false, message: "Chamado deletado com sucesso!", data: res};
    }catch(err){
        console.log(err)
        return {error: true, message: "Erro ao deletar chamado!"};
    }finally{
        await prisma.$disconnect();
    }
}