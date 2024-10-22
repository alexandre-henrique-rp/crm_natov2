"use server";

import { Tag } from "@/data/tags";
import { auth } from "@/lib/auth_confg";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function UpdateSolicitacao(_: any, data: FormData) {
  const session = await getServerSession(auth);
  // console.log(data);

  const id = Number(data.get("id_cliente"));
  const Ativo = data.get("ativo") === "true" ? true : false;

  const TagsArray = data.get("Tags") as any;
  await PostTags(TagsArray, id);

  const DateNascimento = data.get("DataNascimento")?.toString() || "";
  const Dados = {
    ...(Ativo && { ativo: Ativo }),
    ...(Ativo &&
      session?.user.hierarquia !== "ADM" && {
        corretor: Number(session?.user?.id)
      }),
    ...(Ativo &&
      session?.user.hierarquia === "ADM" && {
        corretor: Number(data.get("corretor"))
      }),
    ...(data.get("cpf") && { cpf: data.get("cpf") }),
    ...(data.get("nome") && { nome: data.get("nome") }),
    ...(data.get("telefones1") && { telefone: data.get("telefones1") }),
    ...(data.get("telefones2") && { telefone2: data.get("telefones2") }),
    ...(data.get("email") && { email: data.get("email") }),
    ...(data.get("update_RG") && { uploadRg: data.get("update_RG") }),
    ...(data.get("update_CNH") && { uploadCnh: data.get("update_CNH") }),
    ...(data.get("DataNascimento") && {
      dt_nascimento: DateNascimento
    }),
    ...(data.get("Obs") && { obs: data.get("Obs") }),
    ...(data.get("empreendimento") && {
      empreedimento: Number(data.get("empreendimento"))
    }),
    ...(data.get("construtora") && {
      construtora: Number(data.get("construtora"))
    }),
    ...(data.get("financeiro") && {
      financeiro: Number(data.get("financeiro"))
    }),
    ...(data.get("links") && {
      mult_link: data.get("links")
        ? data.get("links")?.toString().split(", ")
        : []
    }),
    ...(data.get("Relacionamento") && {
      relacionamento: data.get("Relacionamento")
        ? JSON.parse(data.get("Relacionamento")?.toString() || "")
        : []
    }),
    ...(data.get("Relacionamento") && { rela_quest: true })
  };
 
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`
      },
      body: JSON.stringify(Dados)
    }
  );

  if (request.ok) {
    const response = await request.json();

    if (response.name === "PrismaClientValidationError") {
      return {
        name: "PrismaClientValidationError",
        message: "Erro ao atualizar o registro",
        error: response
      };
    }

    // console.log("Atualização bem-sucedida:", response);
    return response;
  } else {
    console.error("Erro ao atualizar:", request.statusText);
  }
  prisma.$disconnect();
}


async function PostTags(value: any, id: number) {
  const session = await getServerSession(auth);
  const tags = JSON.parse(value);
  for (let i = 0; i < tags.length; i++) {
    const tag: Tag = tags[i];
    if (tag.label && session?.user.hierarquia === "ADM") {
      const verifique = await prisma.nato_tags.findFirst({
        where: {
          descricao: tag.label,
          solicitacao: id
        }
      });
      const filtro = verifique ? false : true;
      if (filtro) {
        await prisma.nato_tags.create({
          data: {
            descricao: tag.label,
            solicitacao: id
          }
        });
      }
    }
  }
}