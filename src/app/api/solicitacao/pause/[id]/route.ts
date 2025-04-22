import { GetSessionServer } from "@/lib/auth_confg";
import { NextResponse } from "next/server";

export default async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const dados = await request.json();
    const session = await GetSessionServer();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao/pause/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify({
          pause: dados.pause,
          ...(dados.reativar && { reativar: dados.reativar }),
        }),
      }
    );

    const res = await req.json();

    if (!req.ok) {
      throw new Error("Erro ao pausar solicitação");
    }

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
