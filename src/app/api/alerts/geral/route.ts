import { GetSessionServer } from "@/lib/auth_confg";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await GetSessionServer();
    if (!session)
    {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    console.log("🚀 ~ POST ~ body:", body)

    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/system-message`;
    const post = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await post.json();
    console.log("🚀 ~ POST ~ data:", data)

    if (!post.ok)
      return NextResponse.json(
        { message: data.message },
        { status: post.status }
      );

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message.join("\n") || error.message }, { status: 500 });
  }
}
