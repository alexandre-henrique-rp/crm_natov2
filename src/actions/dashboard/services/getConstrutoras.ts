'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function GetConstrutoras(){
    try{
        const req = await prisma.nato_empresas.findMany({
            where:{
                id: {
                    gt: 1
                }
            },
            select:{
                id: true,
                fantasia: true
            }
        })

        return req
    }catch(error){
        console.log(error)
    }finally{
        await prisma.$disconnect
    }

}