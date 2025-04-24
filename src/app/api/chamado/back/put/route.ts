"use server";
import { GetSessionServer } from "@/lib/auth_confg";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const session = await GetSessionServer();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();

    const id = formData.get("id");
    const status = formData.get("status");
    const resposta = formData.get("resposta");
    const files = formData.getAll("files") as File[];

    const uploadForm = new FormData();

    if (!resposta) {
      return NextResponse.json({ message: "Resposta vazia" }, { status: 400 });
    } else {
      uploadForm.append("resposta", resposta.toString());
    }

    if (!status) {
      return NextResponse.json(
        { message: "Sem status, status vazio" },
        { status: 400 }
      );
    } else {
      uploadForm.append("status", status.toString());
    }

    files.forEach((file) => {
      uploadForm.append("files", file);
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/chamado/atualizar/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
        body: uploadForm,
      }
    );

    const retorno = await response.json();

    if (!response.ok) {
      throw new Error(retorno.message || "Erro ao atualizar chamado");
    }

    return NextResponse.json(
      { data: retorno, message: "Chamado atualizado com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao atualizar chamado:", error);
    return NextResponse.json(
      { message: error.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
