import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GetAlertDoc(id: any){
    try{
        const req = await prisma.nato_solicitacoes_certificado.findUnique({
            where: {
                id: id
            },
            select:{
                uploadCnh: true,
                uploadRg: true,
            }
        })
        return {
            docRG: req?.uploadRg,
            docCNH: req?.uploadCnh
        }
    }catch(err){
        console.log("🚀 ~ GetAlertDoc ~ err:", err)
    }finally{
        await prisma.$disconnect(); 
    }
}