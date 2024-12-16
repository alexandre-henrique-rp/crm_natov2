// src/app/api/suporte/upload/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const response = await fetch("https://devapisisnato.redebrasilrp.com.br/chamado/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data), 
        });

        const retornoArquivo = await response.json();


        if (!response.ok) {
            throw new Error(retornoArquivo.message || "Erro ao criar chamado");
        }


        return NextResponse.json(
            { data: retornoArquivo, message: "Chamado criado com sucesso" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Erro ao criar chamado:", error);
        return NextResponse.json(
            { message: error.message || "Erro interno do servidor" },
            { status: error.status || 500 }
        );
    }
}
