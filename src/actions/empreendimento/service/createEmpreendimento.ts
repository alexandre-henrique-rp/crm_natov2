'use server'

import { PrismaClient } from "@prisma/client";
import { CreateEmpreendimentoDto } from "../dto/createEmpreendimento.dto";

const prisma = new PrismaClient();

export async function CreateEmpreendimento(_: any, data: FormData) {
console.log("🚀 ~ CreateEmpreendimento ~ data:", data)

    


    

    // const request = await prisma.nato_empreendimento.create({});

}