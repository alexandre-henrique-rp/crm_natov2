// 'use server'
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function GetAlertaNow(id: number){
//     try{
//         const req = await prisma.nato_solicitacoes_certificado.findUnique({
//             where: {
//                 id: id
//             },
//             select: {
//                 alertanow: true
//             }
//         })
//         return req?.alertanow
//     }finally{
//         await prisma.$disconnect();
//     }
// }