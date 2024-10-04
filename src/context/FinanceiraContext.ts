import { createContext } from "react";

type FinanceiraType = {
    cnpj: string;
    setCnpj: (value: string) => void;
    razaosocial: string;
    setRazaosocial: (value: string) => void;
    tel: string | null;
    setTelefone: (value: string | null) => void;
    email: string | null;
    setEmail: (value: string | null) => void;
    responsavel: string | null;
    setResponsavel: (value: string | null) => void;
    fantasia: string | null;
    setFantasia: (value: string | null) => void;
}

export const FinanceiraContext = createContext<FinanceiraType>({
    cnpj: '',
    setCnpj: () => { },
    razaosocial: '',
    setRazaosocial: () => { },
    tel: '',
    setTelefone: () => { },
    email: '',
    setEmail: () => { },
    responsavel: '',
    setResponsavel: () => { },
    fantasia: '',
    setFantasia: () => { },
})