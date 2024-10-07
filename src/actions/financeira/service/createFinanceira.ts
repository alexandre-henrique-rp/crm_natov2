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

    // Valida se há erro antes de prosseguir
    if (erroValidacao) {
        return {
            error: true,
            message: erroValidacao,
            data: null,
        };
    }

    // Verifica se o CNPJ já está cadastrado
    const req = await prisma.nato_financeiro.findFirst({
        where: { cnpj }
    });
    
    if (req) {
        return { 
            error: true, 
            message: "CNPJ já cadastrado", 
            data: null 
        };
    }

    try {
        // Cria uma nova entrada de financeira no banco
        // await prisma.nato_financeiro.create({
        //     data: {
        //         cnpj,
        //         razaosocial,
        //         tel: telefone,
        //         email,
        //         responsavel,
        //         fantasia,
        //     }
        // });

    } catch (error: any) {
        return {
            error: true, 
            message: "Erro ao criar a financeira", 
            data: error 
        };
    } finally {
        // Desconecta o Prisma após a operação
        await prisma.$disconnect();
    }
}
