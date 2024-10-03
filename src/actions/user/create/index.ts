"use server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { redirect } from "next/navigation";


const prisma = new PrismaClient();

 function generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  function parseArrayString(str: string): string {
    if (str.trim() === '') {
      return JSON.stringify([]); 
    }
    return JSON.stringify(str.split(',').map(Number));
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
  const Cargo = data.get("cargo") as string;
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

    const construtoraArray = parseArrayString(construtora);
    const empreendimentoArray = parseArrayString(empreendimento);
    const FinanceiraArray = parseArrayString(Financeira);
    
    const user = await prisma.nato_user.create({
      data: {
        cpf: cpf,
        nome: nome.toUpperCase(),
        username: username.toUpperCase(),
        telefone: telefone,
        email: email,
        construtora: JSON.stringify(construtoraArray),
        empreendimento: JSON.stringify(empreendimentoArray),
        Financeira: JSON.stringify(FinanceiraArray),
        hierarquia: hierarquia,
        password: password,
        status: false,
        cargo: Cargo,
        password_key: Password_key,
        reset_password: true,
      }
    });
    redirect('/usuarios');
    return {
      error: false,
      message: "Usuário cadastrado com sucesso"
    };

  }
}
