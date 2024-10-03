import { PrismaClient } from "@prisma/client";
import { DetIncioFimSituacaoConstrutoraDto } from "../dto/getIncioFimSituacaoConstrutora.dto";


const prisma = new PrismaClient();

type dataType = {
  id: number;
    nome: string;
    cpf: string;
    empreedimento: number | null;
    createdAt: Date;
    dt_aprovacao: Date | null;
    estatos_pgto: string | null;
    valorcd: number | null;
}

/**
 * Busca as solicitações no banco de dados, considerando o construtora,
 * data de início e fim, e situação de pagamento.
 *
 * @param {string} inicio - Data de início no formato "yyyy-mm-dd".
 * @param {string} fim - Data de fim no formato "yyyy-mm-dd".
 * @param {number} situacao - Id da situação de pagamento.
 * @param {number} construtora - Id da construtora.
 * @type {dataType[]} - { id: number, nome: string, cpf: string, empreedimento: number | null, createdAt: Date, dt_aprovacao: Date | null, estatos_pgto: string | null, valorcd: number | null }
 *
 * @returns {Promise<{ error: boolean, message: string, data: dataType[] | null }>}
 */
export async function GetIncioFimSituacaoConstrutora(inicio: string, fim: string, situacao: number, construtora: number): Promise<{ error: boolean; message: string; data: dataType[] | null; }> {
  const dto = new DetIncioFimSituacaoConstrutoraDto(construtora, inicio, fim, situacao);

  // Validação usando o DTO
  const erroValidacao = dto.validar();
  if (erroValidacao) {
    return {
      error: true,
      message: erroValidacao,
      data: null,
    };
  }

  try {
    // Busca as solicitações no banco de dados
    const dados = await prisma.nato_solicitacoes_certificado.findMany({
      where: {
        construtora: dto.construtora,
        createdAt: {
          gte: new Date(dto.inicio),
          lte: new Date(dto.fim),
        },
        Andamento: {
          in: ["APROVADO", "EMITIDO"],
        },
        situacao_pg: {
          equals: dto.situacao,
        },
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
      },
    });

    return {
      error: false,
      message: "Success",
      data: dados,
    };
  } catch (error: any) {
    // Tratamento genérico de erro
    console.error("Erro ao buscar solicitações:", error);
    return {
      error: true,
      message: "Erro interno no servidor.",
      data: null,
    };
  }
}
