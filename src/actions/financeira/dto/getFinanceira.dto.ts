export class GetFinanceiraDto {
    id: number;


    /**
     * Constructs a new instance of the class.
     * 
     * @param id - The unique identifier for the financeira.
     */
    
    constructor(    
        id: number,
    ){
        this.id = id;
    }

    validar(): string | null {
        if (this.id <= 0) {
            return 'Id inválido';
        }
        return null;
    }
}
