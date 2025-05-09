import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { cpf: string } }
) {
  try {
    const { cpf } = params;
    const data = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/get-infos/checkcpf/${cpf}`);
    const response = await data.json();
    if (response.error) {
      return NextResponse.json(
        { message: response.message, cpf: true, solicitacoes: [] },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Você pode prosseguir com o cadastro.", cpf: false, solicitacoes: [] },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
