'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function IniciarAtendimento(id: number) {
    try{
       const req = await prisma.nato_solicitacoes_certificado.update({
            where: {
                id: id
            },
            data: {
                statusAtendimento: true
            }
            
        });
        return {error: false, message: "Atendimento iniciado com sucesso!", data: req}
    }catch(err){
        return {error: true, message: "Erro ao iniciar atendimento!", data: err}
    }finally{
        await prisma.$disconnect();
    }
}