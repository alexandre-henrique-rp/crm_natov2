import { GetSessionServer } from "@/lib/auth_confg";
import { NextResponse } from "next/server";

export async function GET() {
  const payload = await GetSessionServer();
  const session = payload?.user ?? null;
  return NextResponse.json({ session });
}
