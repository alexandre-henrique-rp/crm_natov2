import { NextResponse } from "next/server";
import { DeleteSession } from "@/lib/auth_confg";

export async function GET(request: Request) {
  try {
    await DeleteSession();
    return NextResponse.json(
      { message: "Logout realizado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Erro ao realizar logout" }, { status: 500 });
  }
}
