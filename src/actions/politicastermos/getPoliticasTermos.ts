import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 

export default async function getLastPoliticaTermo() {
    const data = await prisma.nato_termos.findFirst({
        orderBy: {
            id: 'desc',
        },
    });
    await prisma.$disconnect();
    return data;
}
