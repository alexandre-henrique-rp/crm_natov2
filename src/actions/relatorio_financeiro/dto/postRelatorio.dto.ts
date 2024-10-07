export class PostRelatorioDto {
  situacao_pg: number;
  nota_fiscal?: string;  // Opcional
  solicitacao: number[];
  construtora: number;

  constructor(situacao_pg: number, nota_fiscal: string | undefined, solicitacao: number[], construtora: number) {
    this.situacao_pg = situacao_pg;
    this.nota_fiscal = nota_fiscal;
    this.solicitacao = solicitacao;
    this.construtora = construtora;
  }

  // Validação
  validar(): string | null {
    // Validação da construtora
    if (!Number.isInteger(this.construtora) || this.construtora <= 0) {
      return "A construtora deve ser informada.";
    }
    // Validação da situação de pagamento
    if (!Number.isInteger(this.situacao_pg) || this.situacao_pg < 0 || this.situacao_pg > 2) {
      return "A situação de pagamento deve ser 0, 1 ou 2.";
    }

    // Validação da nota fiscal (se enviada, deve ser uma string)
    if (this.nota_fiscal !== undefined && typeof this.nota_fiscal !== 'string') {
      return "A nota fiscal deve ser uma string.";
    }

    // Validação da solicitação (deve ser um array de números)
    if (!Array.isArray(this.solicitacao) || this.solicitacao.length === 0) {
      return "A solicitação deve ser um array de números e não pode estar vazio.";
    }

    for (const item of this.solicitacao) {
      if (typeof item !== 'number') {
        return "Cada item da solicitação deve ser um número.";
      }
    }

    return null;
  }
}
