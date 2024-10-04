import { PrismaClient } from "@prisma/client";
import { GetFinanceiraDto } from "../dto/getFinanceira.dto";

const prisma = new PrismaClient();

export type FinanceiraType = {
    id: number;
    cnpj: string;
    razaosocial: string;
    tel: string | null;
    email: string | null;
    responsavel: string | null;
  }

export async function GetFinanceiraById(id: number): Promise<{ error: boolean; message: string; data: any }> {

    const dto = new GetFinanceiraDto(id);
    const erroValidacao = dto.validar();
    if(erroValidacao){
        return { error: true, message: erroValidacao, data: null };
    }

    try{
        const request = await prisma.nato_financeiro.findFirst({
            where:{
                id: id
            },
            select:{
                id: true,
                cnpj: true,
                razaosocial: true,
                tel: true,
                email: true,
                responsavel: true,
                fantasia: true,
            }
        });
        return { error: false, message: "success", data: request };
    } catch (error: any) {
        return { error: true, message: "error", data: error };
    }finally{
        await prisma.$disconnect();
    }
}