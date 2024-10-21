"use server";
import { PrismaClient } from "@prisma/client";
import { ProtocoloDto } from "../dto/protocolo.dto";

const prisma = new PrismaClient();

export async function GetProtocolo(protocolo: string) {
  const dto = new ProtocoloDto(protocolo);
  // Validação usando o DTO
  const erroValidacao = dto.validar();
  if (erroValidacao) {
    return {
      error: true,
      message: erroValidacao,
      data: null
    };
  }
  try {
    // Busca o protocolo no banco de dados
    const request = await prisma.nato_relatorio_financeiro.findFirst({
      where: { protocolo: dto.protocolo }
    });
    if (!request) {
      return {
        error: true,
        message: "Protocolo não encontrado.",
        data: null
      };
    }
    let solicitacaoIds = [];

    // Validação do campo solicitacao como JSON válido
    try {
      solicitacaoIds = JSON.parse(request.solicitacao);
    } catch (parseError) {
      console.error("Erro ao fazer parse do campo solicitacao:", parseError);
      return {
        error: true,
        message: "Erro ao processar a solicitação.",
        data: null
      };
    }
    // Trazer informações da solicitação
    const solicitacao: any =
      await prisma.nato_solicitacoes_certificado.findMany({
        where: {
          id_fcw: {
            in: solicitacaoIds
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
          empreedimento: true,
          id_fcw: true
        }
      });
    return {
      error: false,
      message: "Success",
      data: {
        ...request,
        ...(request.createdAt && {
          createdAt: new Date(request.createdAt).toISOString()
        }),
        ...(request.construtora && {
          construtora: await GetConstrutora(request.construtora)
        }),
        ...(solicitacao.length > 0
          ? {
              solicitacao: solicitacao.map((s: any) => {
                return {
                  ...s,
                  createdAt: new Date(s.createdAt).toISOString(),
                  dt_aprovacao: new Date(s.dt_aprovacao).toISOString()
                };
              })
            }
          : {
              solicitacao: []
            })
      }
    };
  } catch (error: any) {
    // Tratamento genérico de erro
    console.error("Erro ao buscar protocolo:", error.message);
    return {
      error: true,
      message: "Erro interno no servidor. " + error.message,
      data: null
    };
  } finally {
    await prisma.$disconnect();
  }
}

async function GetConstrutora(id: number) {
  const reqest = await prisma.nato_empresas.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      fantasia: true
    }
  });
  return reqest;
}
