import { GetSessionServer } from "@/lib/auth_confg";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await GetSessionServer();
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/alert`;
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    });
    const data = await request.json();

    if (!request.ok)
      return NextResponse.json(
        { message: "Solicitação não encontrada" },
        { status: 404 }
      );

    const filterData = data
      .filter((alert: any) => alert.status === true)
      .filter(
        (alert: any) =>
          alert.corretor === session?.id || alert.corretor === null
      );

    return NextResponse.json(filterData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
