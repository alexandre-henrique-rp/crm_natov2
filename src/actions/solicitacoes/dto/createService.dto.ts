export class CreateSuportDto{
    id: number;
    descricao: string;
    tag: string;

    /**
     * Creates an instance of the service with the specified id, description, and tag.
     * 
     * @param id - The unique identifier for the service.
     * @param descricao - A brief description of the service.
     * @param tag - A tag associated with the service.
     */
    constructor(id: number, descricao: string, tag: string){
        this.id = id;
        this.descricao = descricao;
        this.tag = tag;
    }
    validar(): string | null {
        if (!Number.isInteger(this.id) || this.id <= 0) {
            return "Erro no id da solicitação.";
        }
        if (this.tag === "") {
            return "A tag deve ser definida.";
        }
        return null;
    }
}