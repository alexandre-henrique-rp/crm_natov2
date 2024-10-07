'use server'
import { PrismaClient } from "@prisma/client";
import { CreateFinanceiraDto } from "../dto/createFinanceira.dto";
import { redirect } from "next/navigation";


const prisma = new PrismaClient();

export default async function FinanceiraCreate(_: any, data: FormData) {
    const cnpj = data.get("cnpj") as string;
    const razaosocial = data.get("razaosocial") as string;
    const tel = data.get("telefone") as any;
    const email = data.get("email") as string;
    const responsavel = data.get("responsavel") as string;
    const fantasia = data.get("fantasia") as string;
    
    const telefone = tel.replace(/[^0-9]/g, '');

    const dto = new CreateFinanceiraDto(cnpj, razaosocial, telefone, email, responsavel, fantasia);    

    const erroValidacao = dto.validar();
   
    
    if (erroValidacao) {
        return {
            error: true,
            message: erroValidacao,
            data: null,
        };
    }
    const req = await prisma.nato_financeiro.findFirst({
        where: {
            cnpj: cnpj
        }
    })
    if(req){
        return { error: true, message: "CNPJ já cadastrado", data: null };
    }
    try {
        const request = await prisma.nato_financeiro.create({
            data: {
                cnpj: cnpj,
                razaosocial: razaosocial,
                tel: telefone,
                email: email,
                responsavel: responsavel,
                fantasia: fantasia,
            }
        });
        redirect('/usuarios');
    } catch (error: any) {
        return { error: true, message: "Erro ao criar a financeira", data: error };
    }finally{
        await prisma.$disconnect();
    }
}