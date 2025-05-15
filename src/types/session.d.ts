export interface Construtora {
  id: number;
  fantasia: string;
}

export interface Empreendimento {
  id: number;
  nome: string;
}

export interface Financeira {
  id: number;
  fantasia: string;
}

export interface UserRoler {
  adm?: boolean;
  now?: boolean;
  user?: boolean;
  alert?: boolean;
  direto?: boolean;
  chamado?: boolean;
  finaceiro?: boolean;
  construtora?: boolean;
  lista_const?: boolean;
  lista_empre?: boolean;
  solicitacao?: boolean;
  lista_finace?: boolean;
  empreendimento?: boolean;
  relatorio?: boolean;
}

export interface AuthUser {
  Financeira: Financeira[];
  id: number;
  nome: string;
  construtora: Construtora[];
  telefone: string;
  empreendimento: Empreendimento[];
  hierarquia: "ADM" | "CCA" | "GRT" | "CONST" | "USER";
  cargo: string;
  role: UserRoler;
  reset_password: boolean;
  termos: boolean;
}

// Tipagem retornada ao cliente (useSession)
export type SessionClient = AuthUser;

// Tipagem da carga completa do token no servidor
export interface SessionServer {
  token: string;
  user: AuthUser;
  iat: number;
  exp: number;
}
