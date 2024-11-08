'use server';
import { PrismaClient } from "@prisma/client";
import { UpdateTermosDto } from "../dto/updateTermos.dto";

const prisma = new PrismaClient();

export default async function UpdateTermos(id : number, termo : boolean){ 
    const termoAceito = termo
    const idUser = id

    const dto = new UpdateTermosDto(idUser, termoAceito); 
    const erroValidacao = dto.validar();
    if(erroValidacao){
        return { error: true, message: erroValidacao, data: null };
    }
    
    try{
        const data = await prisma.nato_user.update({
            where:{
                id: idUser
            },
            data:{
                termos: termoAceito
            }
        })
        return { error: false, message: 'Política de Privacidade e Termo de uso aceito', data: data };
    }catch(err){
        return { error: true, message: (err as Error).message, data: null };
    }finally{
        await prisma.$disconnect();
    }
}