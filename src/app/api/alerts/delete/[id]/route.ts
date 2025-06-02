import { GetSessionServer } from "@/lib/auth_confg";

import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await GetSessionServer();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!session.user?.role?.alert) {
      return NextResponse.json(
        { message: "Você não tem permissão para deletar um alerta" },
        { status: 401 }
      );
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/alerts/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );
    const retorno = await response.json();
    return NextResponse.json(retorno, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message.join("\n") || error.message },
      { status: 500 }
    );
  }
}
