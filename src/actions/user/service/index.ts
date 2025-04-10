"use server";
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function UpdateUser(_: any, data: FormData) {
  const id = data.get("id") as string;
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
    ...(telefone && { telefone: telefone.replace(/\D/gm, "") }),
    email: email,
    ...(construtora && { construtora: construtoraArray }),
    ...(empreendimento && {
      empreendimento: empreendimentoArray,
    }),
    ...(financeira && { Financeira: FinanceiraArray }),
    hierarquia: hierarquia,
    cargo: cargo,
  };

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user/update/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(body),
    }
  );
  const res = await req.json();
  if (!req.ok) {
    return {
      error: true,
      message: res.message,
      data: null,
      status: req.status,
    };
  }

  redirect("/usuarios");
}
