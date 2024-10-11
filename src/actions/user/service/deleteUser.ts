'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DeleteUser(id: number){
    
    const user = await prisma.nato_user.delete({
        where: {
            id: id
        }
    });
    return { error: false, message: "Usuário deletado com sucesso", data: user };
    
    
}