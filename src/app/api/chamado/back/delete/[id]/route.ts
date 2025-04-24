import { GetSessionServer } from "@/lib/auth_confg";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const session = await GetSessionServer();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/chamado/${context.params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );

    const retornoArquivo = await response.json();

    if (retornoArquivo.error) {
      throw retornoArquivo.error;
    }

    return NextResponse.json(
      { data: retornoArquivo, message: "Chamado Fechado com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao Fechar o Chamado:", error);
    return NextResponse.json(error.message, { status: error.status || 500 });
  }
}
