'use server'
import { PrismaClient } from "@prisma/client";
import { EditEmpreendimentoDto } from "../dto/editEmpreendimento.dto";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function EditEmpreendimento(_:any, data: FormData) {

    const id = Number(data.get("id") as string);
    const construtora = Number(data.get("empreendimentoConstrutora") as string);
    const nome = data.get("nomeEmpreendimento") as string;
    const cidade = data.get("nomeCidade") as string;
    const uf = data.get("empreendimentoUf") as string;
    const financeiro = data.get("financeira") as string;
    const financeiroFormatado = `[${financeiro}]`;
    const ativo = true;
    const dto = new EditEmpreendimentoDto(nome, construtora, uf, cidade, ativo, financeiro);
    const erroValidacao = dto.validar();

    if (erroValidacao) {
        return {
            error: true,
            message: erroValidacao,
            data: null,
        };
    }

    const request = await prisma.nato_empreendimento.update({
        where: {
            id: id
        },
        data: {
            nome: nome,
            construtora: construtora,
            cidade: cidade,
            uf: uf,
            financeiro: financeiroFormatado
        }
    });


     
    prisma.$disconnect();
    redirect('/empreendimentos');
}
