import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const dados = await prisma.nato_solicitacoes_certificado.findMany({
      where: {
        construtora: Number(data.construtora),
        createdAt: {
          gte: new Date(data.inicio),
          lte: new Date(data.fim)
        },
        Andamento: {
          in: ["APROVADO", "EMITIDO"]
        },
        situacao_pg: {
          equals: Number(data.situacao)
        }
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        estatos_pgto: true,
        valorcd: true,
        dt_aprovacao: true,
        createdAt: true,
        empreedimento: true
      }
    });

    const resultado = await Promise.all(
      dados.map(async (item) => {
        const request = await prisma.nato_empreendimento.findUnique({
          where: {
            id: Number(item.empreedimento)
          },
          select: {
            id: true,
            nome: true
          }
        });
        return {
          id: item.id,
          nome: item.nome,
          cpf: item.cpf,
          estatos_pgto: item.estatos_pgto,
          valorcd: item.valorcd,
          dt_aprovacao: item.dt_aprovacao,
          createdAt: item.createdAt,
          empreedimento: request
        };
      })
    );
    console.log("🚀 ~ resultado ~ resultado:", resultado);

    return NextResponse.json(resultado, { status: 200 });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
