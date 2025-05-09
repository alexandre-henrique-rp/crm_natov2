import { GetSessionServer } from "@/lib/auth_confg";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const session = await GetSessionServer();
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/ficha/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.token}`,
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            const text = await response.text();
            console.error("Strapi error:", text);
            return new NextResponse(
                `Erro ao criar o registro: ${text}`,
                { status: response.status }
            );
        }

        const retorno = await response.json();
        return NextResponse.json(
            {
                message: "FC criado com sucesso",
                data: { response: retorno },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}
