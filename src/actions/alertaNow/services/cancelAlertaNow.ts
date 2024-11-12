'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function CancelAlertaNow(id: number){

    try{
        const req = await prisma.nato_solicitacoes_certificado.update({
            where:{
                id: id
            },
            data:{
                alertanow: false
            }
        })
        return {error: false, message: "Alerta cancelado com sucesso!", data: req}
    }catch(err){
        return {error: true, message: "Erro ao cancelar alerta!", data: err}
    }finally{
        await prisma.$disconnect();
    }
}
