"use server";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
) {
  try {
    const body: any = await request.json();
    const tel = body.telefone;
    const api = await fetch("https://chatwebhook.redebrasilrp.com.br/webhook/test_whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        telefone: tel,
      }),
    });
    const data = await api.json();
    console.log("🚀 ~ data:", data)
    return NextResponse.json({ data: data }, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}