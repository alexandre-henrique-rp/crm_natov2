'use server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export const CheckCpf = async (cpf: string) => {
  const verificaCpf = await prisma.nato_solicitacoes_certificado.findFirst({
    where: {
      cpf: cpf
    }
  });
  if (verificaCpf) {
    await prisma.$disconnect();
    return { error: true, message: "CPF já cadastrado", data: null };
  }
  await prisma.$disconnect();
  return { error: false, message: "", data: null };
}