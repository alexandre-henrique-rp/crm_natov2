import { GetSessionClient, GetSessionServer } from "@/lib/auth_confg";
import { NextResponse } from "next/server";

export async function GET() {
  // const payload = await GetSessionServer();
  const payload = await GetSessionClient();
  console.log("🚀 ~ GET ~ payload:", payload)
  const session = payload ?? null;
  return NextResponse.json({ session });
}
