import { GetSessionServer } from "@/lib/auth_confg";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await GetSessionServer();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!session.user?.role?.alert) {
      return NextResponse.json(0, { status: 200 });
    }
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/alert/cont`;
    const get = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      next: { revalidate: 5 },
    });
    const data = await get.json();

    if (!get.ok)
      return NextResponse.json(
        { message: data.message },
        { status: get.status }
      );

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message.join("\n") || error.message },
      { status: 500 }
    );
  }
};
