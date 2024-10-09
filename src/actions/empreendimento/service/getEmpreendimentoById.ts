import { PrismaClient } from "@prisma/client";
import { GetEmpreendimentoDto } from "../dto/getEmpreendimento.dto";

const prisma = new PrismaClient();

export type EmpreendimentoType = {
    id: number;
    nome: string;
    uf: string;
    cidade: string;
    ativo: boolean;
}

export default async function GetEmpreendimentoById(id : number){
    
    
    const dto = new GetEmpreendimentoDto(id);
    const erroValidacao = dto.validar();
    if(erroValidacao){
        return { error: true, message: erroValidacao, data: null };
    }

    try {
        const request = await prisma.nato_empreendimento.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                nome: true,
                construtora: true,
                uf: true,
                cidade: true,
                ativo: true,
                financeiro: true,
            }
        });
        return { error: false, message: "success", data: request };
    } catch (error) {
        return { error: true, message: "error", data: error };
    } finally {
        await prisma.$disconnect();
    }
}