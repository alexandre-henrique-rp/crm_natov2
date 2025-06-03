import { GetSessionServer } from "@/lib/auth_confg";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const req = await request.json();
    console.log("🚀 ~ req:", req);
    const body = req.form ? req.form : req;
    const tags = req.Tags ? req.Tags : [];

    const dataSend = {
      ...(body.nome && { nome: body.nome }),
      ...(body.email && { email: body.email }),
      ...(body.cpf && { cpf: body.cpf }),
      ...(body.telefone && { telefone: body.telefone }),
      ...(body.telefone2 && { telefone2: body.telefone2 }),
      ...(body.dt_nascimento && { dt_nascimento: body.dt_nascimento }),
      ...(body.uploadCnh && { uploadCnh: body.uploadCnh }),
      ...(body.uploadRg && { uploadRg: body.uploadRg }),
      ...(body.corretorId && { corretor: body.corretorId }),
      ...(body.construtoraId && { construtora: body.construtoraId }),
      ...(body.financeiroId && { financeiro: body.financeiroId }),
      ...(body.empreendimentoId && { empreendimento: body.empreendimentoId }),
      ...(body.relacionamento && { relacionamentos: body.relacionamento.cpf }),
    };
    console.log("🚀 ~ dataSend:", dataSend);

    const session = await GetSessionServer();

    if (tags) {
      tags.map(async (tag: any) => {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/tag`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.token}`,
            },
            body: JSON.stringify({
              descricao: tag.label,
              solicitacao: +id,
            }),
          }
        );
        console.log("🚀 ~ req:", await req.json());
      });
    }
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify(dataSend),
      }
    );

    if (!user.ok) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }
    const data = await user.json();
    console.log("🚀 ~ data:", data);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return NextResponse.json(error, { status: 500 });
  }
}
