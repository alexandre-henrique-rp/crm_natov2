'use server'
import { PrismaClient } from "@prisma/client";
import GetAlertDoc from "./getDocAlertNow";
import { CreateAlertaNowDto } from "../dto/createAlertaNow.dto";

const prisma = new PrismaClient();

export default async function CreateNow(data: any){
    const dataDocs = await GetAlertDoc(data.id);

    
    const dto = new CreateAlertaNowDto(dataDocs);
    const erroValidacao = dto.validar();
    if(erroValidacao){
        return {error: true, message: erroValidacao, data: null}
    }

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