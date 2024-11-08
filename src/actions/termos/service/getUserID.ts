'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getUserID(id: number) {
        const data = await prisma.nato_user.findUnique({
        where: {
            id: id,
        },
        select:{
            termos: true,
        }
        });
        await prisma.$disconnect();
        return data
}