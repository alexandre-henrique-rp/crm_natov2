export class ProtocoloDto {
  protocolo: number;

  constructor(protocolo: number) {
    this.protocolo = protocolo;
  }

  // Validação simples diretamente no DTO
  validar(): string | null {
    if (!Number.isInteger(this.protocolo) || this.protocolo <= 0) {
      return "O protocolo deve ser informado.";
    }
    return null;
  }
}
