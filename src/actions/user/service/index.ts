"use server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function GetUser(id: number) {
  const user = await prisma.nato_user.findUnique({
    where: {
      id: id
    }
  });

  return user;
}

export async function UpdateUser(_: any, data: FormData) {
  const id = data.get("id") as string;
  const cpf = data.get("cpf") as string;
  const nome = data.get("nome") as string;
  const username = data.get("usuario") as string;
  const telefone = data.get("telefone") as string;
  const email = data.get("email") as string;
  const construtora = data.get("construtora") as any;
  const empreendimento = data.get("empreendimento") as any;
  const financeira = data.get("financeira") as any;
  const cargo = data.get("cargo") as string;
  const hierarquia = data.get("hierarquia") as string;

  const construtoraArray = construtora
    ? construtora.split(",").map(Number)
    : [];
  const empreendimentoArray = empreendimento
    ? empreendimento.split(",").map(Number)
    : [];
  const FinanceiraArray = financeira ? financeira.split(",").map(Number) : [];

  await prisma.nato_user.update({
    where: {
      id: Number(id)
    },
    data: {
      cpf: cpf,
      nome: nome,
      username: username,
      ...(telefone && { telefone: telefone.replace(/\D/gm, "") }),
      email: email,
      ...(construtora && { construtora: JSON.stringify(construtoraArray) }),
      ...(empreendimento && {
        empreendimento: JSON.stringify(empreendimentoArray)
      }),
      ...(financeira && { Financeira: JSON.stringify(FinanceiraArray) }),
      hierarquia: hierarquia,
      cargo: cargo
    }
  });
  redirect("/usuarios");
}
