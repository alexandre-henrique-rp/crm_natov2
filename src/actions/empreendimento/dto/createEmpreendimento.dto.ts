
export class CreateEmpreendimentoDto{
    nome: string;
    construtora: number;
    uf: string;
    cidade: string;
    ativo: boolean;
    financeiro: string;
    tag: string;

    /**
     * Cria uma instância de CreateEmpreendimentoDto.
     * 
     * @param {string} nome - O nome do empreendimento.
     * @param {number} construtora - O ID da construtora.
     * @param {string} uf - O estado (UF) onde o empreendimento está localizado.
     * @param {string} cidade - A cidade onde o empreendimento está localizado.
     * @param {number} ativo - O status do empreendimento (ativo/inativo).
     * @param {string} financeiro - Os detalhes financeiros do empreendimento.
     * @param {string} tag - A tag associada ao empreendimento.
     */
    constructor(
        nome: string,
        construtora: number,
        uf: string,
        cidade: string,
        ativo: boolean,
        financeiro: string,
        tag: string
    ){
        this.nome = nome;
        this.construtora = construtora;
        this.uf = uf;
        this.cidade = cidade;
        this.ativo = ativo;
        this.financeiro = financeiro;
        this.tag = tag;
    }

    validar(): string | null {
        if (this.construtora <= 0) {
            return "A construtora é obrigatória.";
        }
        if (this.uf === "" || this.uf.length !== 2) {
            return "O estado (UF) é obrigatório.";
        }
        if (this.cidade === "" || this.cidade.length < 3) {
            return "A cidade é obrigatória.";
        }
        if(this.ativo !== true){
            return "Erro Interno, favor contatar o suporte.";
        }
        return null;
    }
}