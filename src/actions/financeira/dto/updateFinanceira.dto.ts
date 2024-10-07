// /src/dto/CreateFinanceiraDto.ts

import { cnpj } from "cpf-cnpj-validator";

export class UpdateFinanceiraDto {
  cnpj: string;
  razaosocial: string;
  telefone: string;
  email: string;
  responsavel: string;
  fantasia: string;

  /**
   * @param {string} cnpj - CNPJ da financeira.
   * @param {string} razaosocial - Razão social da financeira.
   * @param {string} tel - Telefone da financeira.
   * @param {string} email - E-mail da financeira.
   * @param {string} responsavel - Responsável pela financeira.
   * @param {string} fantasia - Nome fantasia da financeira.
   */
  constructor(
    cnpj: string,
    razaosocial: string,
    tel: string,
    email: string,
    responsavel: string,
    fantasia: string
  ) {
    this.cnpj = cnpj;
    this.razaosocial = razaosocial;
    this.telefone = tel;
    this.email = email;
    this.responsavel = responsavel;
    this.fantasia = fantasia;
  }

  validar(): string | null {

    if (this.cnpj === "") {
      return "O CNPJ é obrigatório.";
    }
    if (this.cnpj.length !== 14) {
      return "O CNPJ deve ter 14 caracteres.";
    }
    const cnpjValidator = cnpj.isValid(this.cnpj);
    if (!cnpjValidator) {
      return "CNPJ inválido.";
    }
    if (this.razaosocial.length < 3) {
      return "A razão social deve ter no mínimo 3 caracteres.";
    }
    return null;
  }
}
