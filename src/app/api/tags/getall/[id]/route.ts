import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/direto-tags/`;
        const tag = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await tag.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({message: "Erro ao buscar as tags"}, { status: 500 });
    }
}