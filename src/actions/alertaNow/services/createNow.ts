'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function CreateNow(data: any){
    const dataAtual = new Date();
    const id = data.id;

    try{
        const req = await prisma.nato_solicitacoes_certificado.update({
            where: {
                id: id
            },
            data: {
                alertanow: true,
                dt_criacao_now: dataAtual
            }
        })

        return {error: false, message: "Alerta criado com sucesso!", data: req}
    }catch(err){
        return {error: true, message: "Erro ao criar alerta!", data: err}
    }finally{
        await prisma.$disconnect(); 
    }
}