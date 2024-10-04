import { PrismaClient } from "@prisma/client";
import { ProtocoloDto } from "../dto/protocolo.dto";

const prisma = new PrismaClient();

export async function GetProtocolo(protocolo: number) {
  const dto = new ProtocoloDto(protocolo);

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
    // Busca o protocolo no banco de dados
    const request = await prisma.nato_relatorio_financeiro.findFirst({
      where: { protocolo: dto.protocolo },
    });

    if (!request) {
      return {
        error: true,
        message: "Protocolo não encontrado.",
        data: null,
      };
    }

    return {
      error: false,
      message: "Success",
      data: request,
    };
  } catch (error: any) {
    // Tratamento genérico de erro
    console.error("Erro ao buscar protocolo:", error.message);
    return {
      error: true,
      message: "Erro interno no servidor.",
      data: null,
    };
  }
}
