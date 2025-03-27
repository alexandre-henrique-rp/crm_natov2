import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/direto-tags`;
        const tag = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await tag.json();

    console.log(data);
        if (!tag.ok)
            return NextResponse.json(
                { message: "Solicitação não encontrada" },
                { status: 404 }
            );
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}