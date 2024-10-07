// /src/dto/CreateFinanceiraDto.ts
export class CreateUsuariosDto {
    cpf: string;
    nome: string;
    usuario: string;
    telefone: string;
    email: string;
    construtora: string;
    empreendimento: string;
    financeira: string;
    cargo: string;
    hierarquia: string;
    senha: string;
    confirsenha: string;
/**
 * Creates an instance of CreateUsuariosDto.
 * 
 * @param cpf - The CPF (Cadastro de Pessoas Físicas) of the user.
 * @param nome - The name of the user.
 * @param usuario - The username of the user.
 * @param telefone - The phone number of the user.
 * @param email - The email address of the user.
 * @param construtora - The construction company associated with the user.
 * @param empreendimento - The enterprise associated with the user.
 * @param financeira - The financial institution associated with the user.
 * @param cargo - The position or job title of the user.
 * @param hierarquia - The hierarchy level of the user.
 * @param senha - The password of the user.
 * @param confirsenha - The confirmation of the user's password.
 */
  constructor(
    cpf: string,
    nome: string,
    usuario: string,
    telefone: string,
    email: string,
    construtora: string,
    empreendimento: string,
    financeira: string,
    cargo: string,
    hierarquia: string,
    senha: string,
    confirsenha: string,
  ) {
    this.cpf = cpf;
    this.nome = nome;
    this.usuario = usuario;
    this.telefone = telefone;
    this.email = email;
    this.construtora = construtora;
    this.empreendimento = empreendimento;
    this.financeira = financeira;
    this.cargo = cargo;
    this.hierarquia = hierarquia;
    this.senha = senha;
    this.confirsenha = confirsenha;
  }

  validar(): string | null {
    if (this.cpf.length !== 11) {
      return "O CPF deve ter 11 caracteres.";
    }
    if (this.nome.length < 3) {
      return "O nome deve ter no mínimo 3 caracteres.";
    }
    if (this.usuario.length < 3) {
      return "O usuário deve ter no mínimo 3 caracteres.";
    }
    if (this.telefone && this.telefone.length < 11 ) {
      return "O telefone deve ter no mínimo 11 caracteres.";
    }
    if (this.email && this.email.length < 5) {
      return "O e-mail deve ter no mínimo 5 caracteres.";
    }
    if (this.senha.length < 4) {
      return "A senha deve ter no mínimo 4 caracteres.";
    }
    if (this.senha !== this.confirsenha) {
      return "As senhas não conferem.";
    }
    if(this.construtora.length < 1){
        return "Adicione ao menos uma construtora.";
        }
    if(this.empreendimento.length < 1){
        return "Adicione ao menos um empreendimento.";
        }
    if(this.financeira.length < 1){
        return "Adicione ao menos uma financeira.";
        }

    return null;
  }
}
