'use server'
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { UpdateConstrutoraDto } from "../dto/updateConstrutora.dto";

const prisma = new PrismaClient();

export default async function UpdateConstrutora(_: any, data: FormData) {

    const id = data.get("id") as string;
    const razaoSocial = data.get("razaosocial") as string;
    const tel = data.get("telefoneSemMask") as string;
    const email = data.get("email") as string;
    const fantasia = data.get("fantasia") as string;

    const dto = new UpdateConstrutoraDto(razaoSocial, tel, email, fantasia);
    
    const erroValidacao = dto.validate();
    if(erroValidacao){
        return { error: true, message: erroValidacao, data: null }
    }

    await prisma.nato_empresas.update({
        where: {
            id: Number(id),
        },
        data: {
            razaosocial: razaoSocial,
            tel: tel,
            email: email,
            fantasia: fantasia,
        },
    });

    await prisma.$disconnect();
    redirect("/construtoras");
}