import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(auth);
    if (!session) {
      return new Response("Unauthorized2", { status: 401 });
    }

    const expiration = session ? session.expiration : 0;
    const expired = Date.now() > expiration * 1000;

    if (expired) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/direto`;
    const direto = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    });
    const data = await direto.json();
    console.log(data);
    if (!direto.ok)
      return NextResponse.json(
        { message: "Solicitação não encontrada" },
        { status: 404 }
      );
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
