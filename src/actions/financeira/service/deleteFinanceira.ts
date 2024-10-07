import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


export async function DeleteFinanceira(id : number) {
  
    const prisma = new PrismaClient();
    
    try {
    const idFinanceira = Number(id);
    const session = await getServerSession(auth);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const reqest = await prisma.nato_financeiro.delete({
        where: {
            id: idFinanceira,
        }
    })

    if (!reqest) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }
    return NextResponse.json(reqest, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
