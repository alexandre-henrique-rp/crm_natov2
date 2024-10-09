'use server';
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { UpdateFinanceiraDto } from "../dto/updateFinanceira.dto";

const prisma = new PrismaClient();

export async function UpdateFinanceira(_: any, data: FormData) {
  const id = Number(data.get("id"));
  const razaoSocial = data.get("razaosocial") as string;
  const cnpj = data.get("cnpj") as string;
  const email = data.get("email") as string;
  const telefone = data.get("telefoneSemMask") as string;
  const responsavel = data.get("responsavel") as string;
  const fantasia = data.get("fantasia") as string;


  const dto = new UpdateFinanceiraDto(
    cnpj,
    razaoSocial,
    telefone,
    email,
    responsavel,
    fantasia
  );
  const error = dto.validar();
  
  if (error) {
    return { error: true, message: error, data: null };
  }

  const request = await prisma.nato_financeiro.update({
    where: { id: id },
    data: {
      cnpj: cnpj,
      razaosocial: razaoSocial,
      tel: telefone,
      email: email,
      responsavel: responsavel,
      fantasia: fantasia,
    },
  });

  redirect("/financeiras");

  return { error: false, message: "success", data: request };
}
