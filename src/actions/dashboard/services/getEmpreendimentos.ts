import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function GetEmpreendimentos(){
    try {
        const req = await prisma.nato_empreendimento.findMany({
            select:{
                id: true,
                nome:true
            }
        })

        return req
    } catch (error) {
        console.log(error)
    }finally{
        await prisma.$disconnect
    }
    
}