import { NextRequest, NextResponse } from "next/server";
import { DeleteSession } from "@/lib/auth_confg";

export async function GET(request: NextRequest) {
  try {
    console.log("Logout");
    await DeleteSession();
    return NextResponse.redirect(new URL("/login", request.url));
  } catch (error) {
    console.log("Logout error", error);
    return NextResponse.json({ message: "Erro ao realizar logout" }, { status: 500 });
  }
}
