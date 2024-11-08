export class UpdateTermosDto {
    id: number;
    termo: boolean;
    constructor(id: number, termo: boolean) {
        this.id = id;
        this.termo = termo;
    }

    validar(): string | null {
        if (this.termo === false){
            return 'Termo de uso não aceito';
        }
        return null;
    }
}