"use server";

import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

 function generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

export default async function UserCreate(_: any, data: FormData) {
  const cpf = data.get("cpf") as string;
  const nome = data.get("nome") as string;
  const username = data.get("usuario") as string;
  const telefone = data.get("telefone") as string;
  const email = data.get("email") as string;
  const construtora = data.get("construtora") as string;
  const empreendimento = data.get("empreendimento") as string;
  const Financeira = data.get("financeira") as string;
  const cargo = data.get("cargo") as string;
  const hierarquia = data.get("hierarquia") as string;
  const password = data.get("senha") as string;
  const passwordConfir = data.get("confirsenha") as string;
  const Password_key = generateHash(password);

  const verificaCpf = await prisma.nato_user.findFirst({
    where: {
      cpf: cpf
    }
  });

  if (verificaCpf) {
    console.log("CPF já cadastrado");
  } else if (password !== passwordConfir) {
    console.log(data.get("Senhas não conferem"));
  } else {

    const user = await prisma.nato_user.create({
      data: {
        cpf: cpf,
        nome: nome.toUpperCase(),
        username: username.toUpperCase(),
        telefone: telefone,
        email: email,
        construtora: JSON.stringify([construtora]),
        empreendimento: JSON.stringify([empreendimento]),
        Financeira: JSON.stringify([Financeira]),
        cargo: data.get("cargo") as string,
        hierarquia: hierarquia,
        password: password,
        password_key: Password_key,
        reset_password: true,
      }
    });
    return {
      error: true,
      message: "Usuário cadastrado com sucesso"
    };
  }
}
