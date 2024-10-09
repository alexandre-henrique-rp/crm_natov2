'use server'
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
  

export async function GetAllFinanceiras(): Promise<{ status: number; message: string; data: any }> {
    try {
        const request = await prisma.nato_financeiro.findMany({
            where: {
                razaosocial: {
                    not: undefined,
                },
            },
            select: {
                id: true,
                cnpj: true,
                razaosocial: true,
                tel: true,
                email: true,
                fantasia: true,
            }
        });
        return { status: 200, message: "success", data: request };
    } catch (error: any) {
        return { status: 500, message: "error", data: error };
    }finally{
        await prisma.$disconnect();
    }
}