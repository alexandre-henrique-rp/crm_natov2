"use server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await getServerSession(auth);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/construtora/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );

    if (!req.ok) {
      return new NextResponse("ERRO", { status: 401 });
    }
    const data = await req.json();
    return NextResponse.json(
      { error: false, message: "Sucesso", data: data },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
