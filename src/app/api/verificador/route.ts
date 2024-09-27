import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: data.email,
          password: data.password
        })
      }
    );

    if (req.ok) {
      const res = await req.json();
      return NextResponse.json(res, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
