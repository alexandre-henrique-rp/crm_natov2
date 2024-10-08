'use server'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function CreateEmpreendimento(_: any, data: FormData) {
console.log("🚀 ~ CreateEmpreendimento ~ data:", data)

    

    // const request = await prisma.nato_empreendimento.create({});

}