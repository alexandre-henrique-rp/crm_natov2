import { GetSessionClient } from "@/lib/auth_confg";
import { NextResponse } from "next/server";

export async function GET() {
<<<<<<< Updated upstream
  // const payload = await GetSessionServer();
  const payload = await GetSessionClient();
=======
  const payload = await GetSessionClient()
>>>>>>> Stashed changes
  const session = payload ?? null;
  return NextResponse.json({ session });
}
