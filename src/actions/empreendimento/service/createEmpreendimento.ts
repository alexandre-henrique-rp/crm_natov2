'use server'

import { PrismaClient } from "@prisma/client";
import { CreateEmpreendimentoDto } from "../dto/createEmpreendimento.dto";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function CreateEmpreendimento(_: any, data: FormData) {

    const construtora = Number(data.get("empreendimentoConstrutora") as string);
    const nome = data.get("nomeEmpreendimento") as string;
    const cidade = data.get("nomeCidade") as string;
    const uf = data.get("empreendimentoUf") as string;
    const financeiro = data.get("financeira") as string;
    const financeiroFormatado = `[${financeiro}]`;
    const tag = 'NATO_'
    
    const dataAtual = new Date();
    const ativo = true;
    const vendedores = '[]'

    const dto = new CreateEmpreendimentoDto(nome, construtora, uf, cidade, ativo, financeiro, tag);
    const erroValidacao = dto.validar();

    if (erroValidacao) {
        return {
            error: true,
            message: erroValidacao,
            data: null,
        };
    }

    await prisma.nato_empreendimento.create({
        data: {
            nome: nome,
            construtora: construtora,
            dt_inicio: dataAtual.toISOString(),
            cidade: cidade,
            uf: uf,
            ativo: ativo,
            financeiro: financeiroFormatado,
            vendedores: vendedores,
            tag: tag
        }
    });

     
    prisma.$disconnect();
    redirect('/empreendimentos');


}
