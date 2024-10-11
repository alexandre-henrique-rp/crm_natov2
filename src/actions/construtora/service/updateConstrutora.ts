'use server'
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function UpdateConstrutora(_: any, data: FormData) {

    const id = data.get("id") as string;
    const razaoSocial = data.get("razaosocial") as string;
    const tel = data.get("telefoneSemMask") as string;
    const email = data.get("email") as string;
    const fantasia = data.get("fantasia") as string;

    const request = await prisma.nato_empresas.update({
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