'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function CancelarAtendimento(id: number) {
    try{
        const req = await prisma.nato_solicitacoes_certificado.update({
             where: {
                 id: id
             },
             data: {
                 statusAtendimento: false
             }
             
         });
         return {error: false, message: "Atendimento cancelado com sucesso!", data: req}
     }catch(err){
         return {error: true, message: "Erro ao cancelar atendimento!", data: err}
     }finally{
         await prisma.$disconnect();
     }
}