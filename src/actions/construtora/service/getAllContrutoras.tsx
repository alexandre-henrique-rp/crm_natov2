'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GetAllConstrutoras(){
    try {
        const request = await prisma.nato_empresas.findMany({
            where:{
                id: { not: 1 },
            },
            select: {
                id: true,
                cnpj: true,
                razaosocial: true,
                tel: true,
                email: true,
                atividade: true,
                fantasia: true,
            }
        });
        return { status: 200, message: "success", data: request };
    } catch (error: any) {
        console.log(error);
        return { status: 500, message: "error", data: null };
    } finally {
        await prisma.$disconnect();
    }
}