import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {

    try {
        const { id } = params;
        
        const data = await prisma.nato_empresas.findUnique({
            where: {
                id: Number(id),
            },
        });
        return NextResponse.json(data, { status: 200 });
        
        // const session = await getServerSession(auth);
        // if (!session) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }
        // const reqest = await fetch(
        //     `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/empresa/${id}`,
        //     {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${session?.token}`,
        //         },
        //     }
        // );
        // const data = await reqest.json();
        // console.log("🚀 ~ data:", data)
        // if (!reqest.ok) {
        //     return new NextResponse("Invalid credentials", { status: 401 });
        // }
        // return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}