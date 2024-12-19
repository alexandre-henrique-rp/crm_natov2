"use server";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
) {
  try {
    const body: any = await request.json();
    const tel = body.telefone;
    const api = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/checktel/${tel}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await api.json();
    return NextResponse.json({ data: data }, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}