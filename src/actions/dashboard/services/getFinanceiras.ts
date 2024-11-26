import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export default async function GetFinanceiras(){

    try {
        const req = await prisma.nato_financeiro.findMany({
            select:{
                id: true,
                fantasia: true
            }
        })
        
        return req
    } catch (error) {
        console.log(error);
    }finally{
        await prisma.$disconnect
    }
    
}