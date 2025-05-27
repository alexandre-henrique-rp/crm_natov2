import { GetSessionServer } from "@/lib/auth_confg";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
  try {
    const data = await request.json();
    const session = await GetSessionServer();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/alert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`
      },
      body: JSON.stringify(data),
    });
    const retorno = await response.json();
    console.log("🚀 ~ POST ~ retorno:", retorno)
    return NextResponse.json(retorno, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }

}

