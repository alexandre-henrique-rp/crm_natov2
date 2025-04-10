"use server";
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export default async function UserCreate(_: any, data: FormData) {
  const cpf = data.get("cpf") as string;
  const nome = data.get("nome") as string;
  const username = data.get("usuario") as string;
  const telefone = data.get("telefone") as string;
  const telefoneFormat = telefone.replace(/\D/g, "");
  const email = data.get("email") as string;
  const construtora = data.get("construtora") as any;
  const empreendimento = data.get("empreendimento") as any;
  const Financeira = data.get("financeira") as any;

  const construtoraArray = construtora
    ? construtora.split(",").map(Number)
    : [];
  const empreendimentoArray = empreendimento
    ? empreendimento.split(",").map(Number)
    : [];
  const FinanceiraArray = Financeira ? Financeira.split(",").map(Number) : [];

  const Cargo = data.get("cargo") as string;
  const hierarquia = data.get("hierarquia") as string;
  const password = data.get("senha") as string;
  const passwordConfir = data.get("confirsenha") as string;

  const session = await getServerSession(auth);

  if (!session) {
    return {
      error: true,
      message: "Unauthorized",
      data: null,
      status: 401,
    };
  }
  const body = {
    nome: nome,
    username: username,
    password: password,
    telefone: telefoneFormat,
    email: email,
    cpf: cpf,
    cargo: Cargo,
    construtora: construtoraArray,
    empreendimento: empreendimentoArray,
    hierarquia: hierarquia,
    Financeira: FinanceiraArray,
    passwordConfir: passwordConfir,
  };

  const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify(body),
  });

  const res = await req.json();

  if (!req.ok) {
    return {
      error: true,
      message: res.message,
      data: null,
      status: req.status,
    };
  }
  return {
    error: false,
    message: res.message,
    data: res.data,
    status: req.status,
  };
}
