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


export interface AuthUser {
  Financeira: Financeira[];
  id: number;
  name: string;
  construtora: Construtora[];
  telefone: string;
  empreendimento: Empreendimento[];
  hierarquia: "ADM" | "CCA" | "GRT" | "CONST" | "USER";
  cargo: string;
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
