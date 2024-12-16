'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface GetInfoChamadosResponse {
    error: boolean;
    message: string;
    data: number | null;
}

export default async function getInfoChamados(): Promise<GetInfoChamadosResponse> {
    try {
        const chamados = await prisma.nato_chamados.count({
            where: {
                status: {
                    not: 3, //conta os que sao diferente de concluido
                },
            },
        });
        return { error: false, message: "Chamados com status diferente de 3", data: chamados || 0 };
    } catch (error) {
        return {
            error: true,
            message: error instanceof Error ? error.message : "Erro desconhecido",
            data: 0,
        };
    } finally {
        await prisma.$disconnect();
    }
}
