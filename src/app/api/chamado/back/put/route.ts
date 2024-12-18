import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        const send = {
            idResposta: data.idResposta,
            status: data.status,
            ...(data.resposta && { resposta: data.resposta }),
            ...(data.images_adm && { images_adm: data.images_adm }),
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/chamado/atualizar/${data.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(send), 
            }
        );

        const retornoArquivo = await response.json();

        if (!response.ok) {
            throw new Error(retornoArquivo.message || "Erro ao atualizar chamado");
        }

        return NextResponse.json(
            { data: retornoArquivo, message: "Chamado atualizado com sucesso" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Erro ao atualizar chamado:", error);
        return NextResponse.json(
            { message: error.message || "Erro interno do servidor" },
            { status: error.status || 500 }
        );
    }
}
