'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DeleteConstrutora(id: number){
    
    const construtora = await prisma.nato_empresas.delete({
        where: {
            id: id
        }
    });
    await prisma.$disconnect();

    return { error: false };
}