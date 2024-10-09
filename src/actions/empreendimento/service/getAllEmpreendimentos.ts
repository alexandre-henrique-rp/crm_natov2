import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GetAllEmpreendimento(){
    try {
        const request = await prisma.nato_empreendimento.findMany({
            select: {
                id: true,
                nome: true,
                uf: true,
                cidade: true,
                ativo: true,
            }
        });
        return { status: 200, message: "success", data: request };
    } catch (error) {
        return { status: 500, message: "error", data: error };
    } finally {
        await prisma.$disconnect();
    }
}