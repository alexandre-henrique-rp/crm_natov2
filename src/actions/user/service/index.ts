'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GetUser(id: number){
    const user = await prisma.nato_user.findUnique({
        where: {
        id: id,
        },
    });
    
    return user;
}


export async function UpdateUser(data : any){
    const user = await prisma.nato_user.update({
        where: {
            id: data.id
        },
        data: {
            cpf: data.cpf,
            nome: data.nome,
            username: data.username,
            telefone: data.telefone,
            email: data.email,
            construtora: data.construtora,
            empreendimento: data.empreendimento,
            Financeira: data.Financeira,
            hierarquia: data.hierarquia,
            password: data.password,
            status: data.status,
            cargo: data.cargo,
            password_key: data.password_key,
            reset_password: data.reset_password,
        }
    });
    return user;
}

