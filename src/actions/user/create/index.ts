"use server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import { CreateUsuariosDto } from "../dto/createUsuarios.dto";


const prisma = new PrismaClient();

 function generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  function parseArrayString(str: string): string {
    if(str === null) {
      return ''
    }else if (str.trim() === '') {
      return JSON.stringify([]); 
    }
    return JSON.stringify(str.split(',').map(Number));
  }
  

export default async function UserCreate(_: any, data: FormData) {
  const cpf = data.get("cpf") as string;
  const nome = data.get("nome") as string;
  const username = data.get("usuario") as string;
  const telefone = data.get("telefone") as string;
  const telefoneFormat = telefone.replace(/\D/g, '');
  const email = data.get("email") as string;
  const construtora = data.get("construtora") as any;
  const empreendimento = data.get("empreendimento") as any;
  const Financeira = data.get("financeira") as any;
  const Cargo = data.get("cargo") as string;
  const hierarquia = data.get("hierarquia") as string;
  const password = data.get("senha") as string;
  const passwordConfir = data.get("confirsenha") as string;
  const Password_key = generateHash(password);

  const dto = new CreateUsuariosDto(cpf, nome, username, telefone, email, construtora, empreendimento, Financeira, Cargo, hierarquia, password, passwordConfir);
  
  const erroValidacao = dto.validar();
  if(erroValidacao){
    return { error: true, message: erroValidacao, data: null
  }
}
  const verificaCpf = await prisma.nato_user.findFirst({
    where: {
      cpf: cpf
    }
  });
  if (verificaCpf) {
    return { error: true, message: "CPF já cadastrado", data: null };
  }else {

    const construtoraArray = parseArrayString(construtora);
    const empreendimentoArray = parseArrayString(empreendimento);
    const FinanceiraArray = parseArrayString(Financeira);

      const user = await prisma.nato_user.create({
        data: {
          cpf: cpf,
          nome: nome.toUpperCase(),
          username: username.toUpperCase(),
          telefone: telefoneFormat,
          email: email,
          construtora: construtoraArray,
          empreendimento: empreendimentoArray,
          Financeira: FinanceiraArray,
          hierarquia: hierarquia,
          password: password,
          status: false,
          cargo: Cargo,
          password_key: Password_key,
          reset_password: true,
        }
      });
      
}
await prisma.$disconnect();
redirect('/usuarios');
}
