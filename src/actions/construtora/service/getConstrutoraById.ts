'use server'
import { GetConstrutoraDto } from "@/actions/construtora/dto/getConstrutora.dto";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export type FinanceiraType = {
    id: number;
    cnpj: string;
    razaosocial: string;
    tel: string | null;
    email: string | null;
    responsavel: string | null;
  }

export async function GetConstrutoraById(id: number){

    const dto = new GetConstrutoraDto(id);
    const erroValidacao = dto.validar();
    if(erroValidacao){
        return { error: true, message: erroValidacao, data: null };
    }

    try{
        const request = await prisma.nato_empresas.findFirst({
            where:{
                id: id
            },
            select:{
              id: true,
              cnpj: true,
              razaosocial: true,
              tel: true,
              email: true,
              fantasia: true
            }
        });
        return { error: false, message: "success", data: request };
    } catch (error: any) {
        return { error: true, message: "error", data: error };
    }finally{
        await prisma.$disconnect();
    }
}